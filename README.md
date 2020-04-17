# plcnext-datalogger-web-app
Web app to access data from PLCnext Datalogger database

## Docker / Balena Engine setup
- Follow [instruction](https://github.com/PLCnext/Docker_GettingStarted/blob/master/getting-started/Part-01/README.md)
- Change `/etc/nftables/balena.nft` accordingly to `ifconfig` output
```
root@axcf2152:/opt/plcnext/# ifconfig
balena0   Link encap:Ethernet  HWaddr 02:42:B7:8F:11:70
          inet addr:172.17.0.1  Bcast:172.17.255.255  Mask:255.255.0.0
          inet6 addr: fe80::42:b7ff:fe8f:1170/64 Scope:Link
          UP BROADCAST MULTICAST  MTU:1500  Metric:1
          RX packets:411 errors:0 dropped:0 overruns:0 frame:0
          TX packets:37 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:26172 (25.5 KiB)  TX bytes:2634 (2.5 KiB)


root@axcf2152:/opt/plcnext/# nano /etc/nftables/balena.nft

#!/usr/sbin/nft -f
define balena_v4 = 172.17.0.0/24

table ip balena {
  chain balena_forward {
    # default forward policy is drop
    type filter hook forward priority 0; policy drop;
    ip saddr $balena_v4 oif eth0 accept
    # accept any established connection traffic
    ct state established,related accept
  }

  chain prerouting {
    type nat hook prerouting priority 0;
  }

  chain postrouting {
    type nat hook postrouting priority 0;
    # apply source nat for balena traffic to the internet
    ip saddr $balena_v4 oif eth0 masquerade
  }
}
```

- Edit firewall rule to accept incoming connections
```
root@axcf2152:/opt/plcnext/# nano /etc/nftables/plcnext-filter

chain basic_filter {
                udp dport 123 accept  comment "NTP (Network Time Protocol)"
                tcp dport 41100 accept  comment "Remoting (e.g. PLCnext Engineer)"
                tcp dport 22 accept  comment "SSH"
                tcp dport 80 accept  comment "HTTP"
                tcp dport 443 accept  comment "HTTPS, Proficloud, eHMI"
                tcp dport 4840 accept  comment "OPC UA"
                tcp dport 17725 accept  comment "(Standard-Port) External Mode Matlab Simulink"
                tcp dport 161 reject  comment "SNMP (Simple Network Management Protocol)"
                udp dport 34962-34964 accept  comment "Profinet Uni-/Multicast Ports"
                tcp dport 3000 accept comment "plcnext-datalogger-web-app docker port"
                jump user_input
        }
```

- Run container
```
balena-engine run -d \
    --name=plcnext-datalogger-web-app \
    --restart=always \
    -p 3000:3000 \
    --volume /opt/plcnext/projects/plcnext-datalogger-web-app/:/usr/app/database/:ro \
    --volume /opt/plcnext/logs/:/usr/app/logs/:ro \
    --env DL_DB_FILE_PATH=/usr/app/database/database-web-app.db \
    --env LOGS_DB_FILE_PATH=/usr/app/logs/default.sqlite \
    axhelp/plcnext-datalogger-web-app:latest
```

- App update and clean unused images
```
# Pull image from Docker Hub
balena-engine pull axhelp/plcnext-datalogger-web-app:latest

# Re-create container
# (command from previous step)

# Remove unused images and containers
balena-engine system prune -a
```


- Build and run container on dev machine
```
docker build --tag plcnext-datalogger-web-app:dev .

docker run --rm \
   --name=plcnext-datalogger-web-app \
   -p 3000:3000 \
   --volume /Users/konopkov/dev/axhelp/plcnext-datalogger-web-app/:/usr/app/database/:ro \
   --env DB_FILE_PATH=/usr/app/database/database-web-app.db \
   --env NODE_ENV=development \
   plcnext-datalogger-web-app:dev
```

