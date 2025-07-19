"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  {
    month: "Jan",
    revenue: 4000,
    orders: 240,
  },
  {
    month: "Feb",
    revenue: 3000,
    orders: 139,
  },
  {
    month: "Mar",
    revenue: 2000,
    orders: 980,
  },
  {
    month: "Apr",
    revenue: 2780,
    orders: 390,
  },
  {
    month: "May",
    revenue: 1890,
    orders: 480,
  },
  {
    month: "Jun",
    revenue: 2390,
    orders: 380,
  },
];

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="month" 
          className="text-muted-foreground"
          fontSize={12}
        />
        <YAxis 
          className="text-muted-foreground"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            color: 'hsl(var(--card-foreground))'
          }}
        />
        <Legend />
        <Bar 
          dataKey="revenue" 
          name="Revenue ($)"
          className="fill-primary" 
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          dataKey="orders" 
          name="Orders"
          className="fill-primary/60" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}