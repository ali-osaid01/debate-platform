'use client'
import React from 'react'
import FeatureCard from '../helper/Feature-Card'
import { Globe, MessageCircle, Shield, TrendingUp, Users, Zap } from 'lucide-react'
import StatCard from '../helper/Stat-Card'
import UserOriginCard from '../helper/Location-Card'

export default function Analytics() {

    const userOrigins = [
        { name: "United States", users: 300000, color: "#3b82f6" },
        { name: "India", users: 250000, color: "#10b981" },
        { name: "Brazil", users: 150000, color: "#f59e0b" },
        { name: "United Kingdom", users: 100000, color: "#ef4444" },
        { name: "Canada", users: 80000, color: "#8b5cf6" },
        { name: "Germany", users: 70000, color: "#ec4899" },
        { name: "Australia", users: 50000, color: "#14b8a6" },
        { name: "Pakistan", users: 20000, color: "#84cc16" },
    ]

    return (
        <div>
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose DebateHub?</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <FeatureCard
                            icon={Users}
                            title="Diverse Community"
                            description="Connect with debaters from all walks of life and expand your worldview."
                        />
                        <FeatureCard
                            icon={Globe}
                            title="Global Reach"
                            description="Engage in discussions that transcend borders and cultures."
                        />
                        <FeatureCard
                            icon={Zap}
                            title="Real-time Debates"
                            description="Experience the thrill of live debates with instant feedback and interactions."
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Safe Environment"
                            description="Our moderation system ensures respectful and constructive discussions."
                        />
                        <FeatureCard
                            icon={TrendingUp}
                            title="Skill Development"
                            description="Improve your critical thinking, argumentation, and communication skills."
                        />
                        <FeatureCard
                            icon={MessageCircle}
                            title="Diverse Topics"
                            description="From politics to philosophy, find debates on topics that interest you."
                        />
                    </div>
                </div>
            </div>
            <div className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Global Impact</h2>
                        <p className="text-xl text-gray-600">
                            Join a thriving community of debaters from around the world, engaging in thought-provoking discussions every day.
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <StatCard value={1000000} label="Active Users" />
                        <StatCard value={50000} label="Countries Represented" />
                        <StatCard value={10000} label="Daily Debates" />
                        <StatCard value={500000} label="Arguments Made" />
                        <UserOriginCard countries={userOrigins} />
                    </div>
                </div>
            </div>
        </div>
    )
}
