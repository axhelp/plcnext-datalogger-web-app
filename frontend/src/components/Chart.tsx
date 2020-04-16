import React, {useState} from 'react';
//@ts-ignore
import {
    ChartContainer,
    ChartRow,
    Charts,
    YAxis,
    LineChart,
    Baseline,
    Legend,
    Resizable,
    styler
    //@ts-ignore
} from "react-timeseries-charts";
//@ts-ignore
import {timeFormat} from 'd3-time-format';
import {format} from "d3-format";
import _ from "underscore";

// Pond
import {TimeSeries} from "pondjs";

const CrossHairs = (props: any) => {

        //@ts-ignore
        const {x, y, width, height} = props;
        const style = {pointerEvents: "none", stroke: "#ccc"};
        if (!_.isNull(x) && !_.isNull(y)) {
            return (
                <g>
                    <line
                        //@ts-ignore
                        style={style} x1={0} y1={y} x2={width} y2={y}
                    />
                    <line
                        //@ts-ignore
                        style={style} x1={x} y1={0} x2={x} y2={height}
                    />
                </g>
            );
        } else {
            return <g/>;
        }
};

const buildPoints = (data: any) => {
    return []
};

export const Trend = (props: any) => {
    const {data} = props;

    const points = buildPoints(data);

    const timeSeries = new TimeSeries({
        name: "Currency",
        columns: ["time", "var1", "var2"],
        points: points
    });

    const initialState = {
        tracker: null,
        timeSeries: timeSeries,
        //@ts-ignore
        timeRange: timeSeries.range(),
        x: null,
        y: null
    };


    const [state, setState] = useState(initialState);


    const style = styler([
        {key: "var1", color: "steelblue", width: 2},
        {key: "var2", color: "#F68B24", width: 2}
    ]);

    const f = format("$,.2f");
    const range = state.timeRange;

    let var2Value, var1Value;
    if (state.tracker) {
        //@ts-ignore
        const index = state.timeSeries.bisect(state.tracker);
        const trackerEvent = state.timeSeries.at(index);
        var1Value = `${f(trackerEvent.get("var1"))}`;
        var2Value = `${f(trackerEvent.get("var2"))}`;
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <Resizable>
                        <ChartContainer
                            timeRange={range}
                            timeAxisStyle={{
                                ticks: {
                                    stroke: "#AAA",
                                    opacity: 0.25,
                                    "stroke-dasharray": "1,1"
                                },
                                values: {
                                    fill: "#AAA",
                                    "font-size": 12
                                }
                            }}
                            showGrid={true}
                            paddingRight={100}
                            //@ts-ignore
                            maxTime={state.timeSeries.range().end()}
                            //@ts-ignore
                            minTime={state.timeSeries.range().begin()}
                            timeAxisAngledLabels={true}
                            timeAxisHeight={65}
                            enablePanZoom={true}
                            minDuration={1000 * 60 * 60 * 24 * 30}
                        >
                            <ChartRow height="400">
                                <YAxis
                                    id="y"
                                    label="Price ($)"
                                    min={0.5}
                                    max={1.5}
                                    style={{
                                        ticks: {
                                            stroke: "#AAA",
                                            opacity: 0.25,
                                            "stroke-dasharray": "1,1"
                                        }
                                    }}
                                    showGrid
                                    hideAxisLine
                                    width="60"
                                    type="linear"
                                    format="$,.2f"
                                />
                                <Charts>
                                    <LineChart
                                        axis="y"
                                        breakLine={false}
                                        series={state.timeSeries}
                                        columns={["var1", "var2"]}
                                        style={style}
                                        interpolation="curveBasis"
                                        //@ts-ignore
                                        highlight={state.highlight}
                                    />
                                    <CrossHairs
                                        //@ts-ignore
                                        x={state.x} y={state.y}
                                    />
                                </Charts>
                            </ChartRow>
                        </ChartContainer>
                    </Resizable>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <span>
                        <Legend
                            type="line"
                            align="right"
                            style={style}
                            //@ts-ignore
                            highlight={state.highlight}
                            //@ts-ignore
                            onHighlightChange={highlight => setState({highlight})}
                            //@ts-ignore
                            selection={state.selection}
                            //@ts-ignore
                            onSelectionChange={selection => setState({selection})}
                            categories={[
                                {key: "var1", label: "VAR1", value: var1Value},
                                {key: "var2", label: "VAR2", value: var2Value}
                            ]}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
};
