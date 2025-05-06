
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Zap, BarChart3 } from "lucide-react";

export function KaizenMethodologies() {
  const methodologies = [
    {
      title: "Value Stream Mapping",
      description: "Visualize and improve the flow of materials and information required to bring a product or service to a customer.",
      icon: Zap,
      link: "/value-stream-mapping",
    },
    {
      title: "Pareto Analysis",
      description: "Identify the vital few causes that are responsible for most of the problems, using the 80/20 rule.",
      icon: BarChart3,
      link: "/pareto-analysis",
    },
    {
      title: "Problem Solving Process",
      description: "A structured approach to define, analyze, and solve problems systematically for continuous improvement.",
      icon: Lightbulb,
      link: "/problem-solving",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Welcome to KaizenAI Assistant
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your AI-powered partner for continuous improvement. Select a Kaizen methodology to get started.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {methodologies.map((method) => (
          <Card key={method.title} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">{method.title}</CardTitle>
              <method.icon className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent>
              <CardDescription>{method.description}</CardDescription>
              <a
                href={method.link}
                className="mt-4 inline-flex items-center text-sm font-medium text-accent hover:text-accent/90"
              >
                Start Process
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-1 h-4 w-4">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
       <Card className="mt-8">
        <CardHeader>
          <CardTitle>How KaizenAI Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            KaizenAI Assistant leverages advanced AI to guide you through essential Kaizen methodologies. 
            Upload your documents, define your goals, and let our AI provide actionable insights, generate roadmaps, 
            and facilitate a structured approach to continuous improvement.
          </p>
          <p>
            Whether you're mapping value streams, identifying key problem areas with Pareto analysis, or engaging in a systematic problem-solving process, 
            KaizenAI is here to enhance your efficiency and effectiveness.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
