import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ChartComponent({ moods }) {
  const chartData = moods.map((item) => ({
    date: item.date,
    moodLevel: Number(item.moodLevel),
  }));

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">

        <h4 className="fw-bold mb-1">
          📊 Mood Analysis
        </h4>

        <p className="text-muted">
          Analyze your daily mood levels and patterns.
        </p>

        {chartData.length === 0 ? (
          <div className="text-center py-5">
            <div className="fs-1">📊</div>
            <p className="text-muted mt-2">
              Add mood entries to see your mood analysis.
            </p>
          </div>
        ) : (
          <div style={{ width: "100%", height: "350px" }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis
                  domain={[1, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  label={{
                    value: "Mood Level",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="moodLevel"
                  stroke="#764ba2"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />

              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

      </div>
    </div>
  );
}

export default ChartComponent;