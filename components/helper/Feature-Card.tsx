import React, { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; 
  title: string;
  description: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
    <CardHeader>
      <Icon className="h-8 w-8 mb-2 text-gray-700" />
      <CardTitle className="text-xl font-bold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

export default FeatureCard;
