'use client'
import { FC } from "react";
import { Card, CardContent } from "../ui/card";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface StatCardProps {
  value: number; 
  label: string;
}

const StatCard: FC<StatCardProps> = ({ value, label }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.3, 
  });

  return (
    <Card className="border-none shadow-lg" ref={ref}>
      <CardContent className="p-6">
        <p className="text-4xl font-bold mb-2">
          {inView ? (
            <CountUp start={0} end={value} duration={3} separator="," />
          ) : (
            0
          )}
        </p>
        <p className="text-sm text-gray-600">{label}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
