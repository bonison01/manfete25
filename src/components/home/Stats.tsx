
import { useEffect, useState } from "react";
import { Users, Music, Camera } from "lucide-react";

interface StatProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  duration: number;
}

const StatCounter = ({ icon, value, label, duration }: StatProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(value / (duration / 16)); // 16ms per frame approx

    const counter = setInterval(() => {
      start += step;
      if (start > value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value, duration]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 rounded-full bg-primary/10 p-4 text-primary">
        {icon}
      </div>
      <div className="text-3xl font-bold sm:text-4xl md:text-5xl">{count.toLocaleString()}</div>
      <div className="mt-2 text-muted-foreground">{label}</div>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-primary sm:text-4xl">Manfete by the Numbers</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We're proud of what we've achieved over the years. Join thousands of others 
            who've experienced the magic of Manfete.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <StatCounter
            icon={<Users size={32} />}
            value={5000}
            label="Attendees Last Year"
            duration={2000}
          />
          <StatCounter
            icon={<Music size={32} />}
            value={150}
            label="Performances Scheduled"
            duration={2000}
          />
          <StatCounter
            icon={<Camera size={32} />}
            value={2500}
            label="Photos Captured"
            duration={2000}
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;
