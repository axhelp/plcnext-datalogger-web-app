import React, {useState} from 'react';
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


export const Trend = (props: any) => {
    const {timeSeries} = props;

    const initialState = {
        tracker: null,
        x: null,
        y: null
    };

    const [state, setState] = useState(initialState);

    const style = styler([
        {key: "var1", color: "0098a1", width: 3},
    ]);

    const f = format("$,.2f");
    const df = timeFormat('%d.%m.%Y %H:%M:%S');
    const timeRange = timeSeries.range();

    let var1Value;
    if (state.tracker) {
        //@ts-ignore
        const index = state.timeSeries.bisect(state.tracker);
        const trackerEvent = timeSeries.at(index);
        var1Value = `${f(trackerEvent.get("var1"))}`;
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <Resizable>
                        <ChartContainer
                            timeRange={timeRange}
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
                            maxTime={timeSeries.range().end()}
                            //@ts-ignore
                            minTime={timeSeries.range().begin()}
                            timeAxisAngledLabels={true}
                            timeAxisHeight={120}
                            enablePanZoom={true}
                            minDuration={1000 * 60 * 60 * 24 * 30}
                            format={df}
                        >
                            <ChartRow height="400">
                                <YAxis
                                    id="y"
                                    label="Value"
                                    min={0}
                                    max={30000}
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
                                    format="d"
                                />
                                <Charts timeFormat={df}>
                                    <LineChart
                                        axis="y"
                                        breakLine={false}
                                        series={timeSeries}
                                        columns={["var1"]}
                                        style={style}
                                        interpolation="curveBasis"
                                        //@ts-ignore
                                        highlight={state.highlight}
                                        smooth={true}
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
                            // onHighlightChange={highlight => setState({highlight})}
                            //@ts-ignore
                            selection={state.selection}
                            //@ts-ignore
                            // onSelectionChange={selection => setState({selection})}
                            categories={[
                                {key: "var1", label: "VAR1", value: var1Value},
                            ]}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
};
