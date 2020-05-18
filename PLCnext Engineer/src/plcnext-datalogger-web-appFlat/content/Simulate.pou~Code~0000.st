(*  Digtal input value *)
I_1_IN00                        := xSimulatedDigitalInputValue;


(*  Analog input value *)
IF xAutoSimulateAnalogInput THEN
    iSimulatedAnalogInputValue  := RTC.SECONDS;
END_IF;

I_2_IN01                        := TO_WORD(iSimulatedAnalogInputValue);
 