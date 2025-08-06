import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users, Award, TrendingUp, ExternalLink, PlayCircle, FileText, Calendar, MapPin, DollarSign, Clock } from 'lucide-react';

interface CareerGuidanceProps {
  onRestart: () => void;
}

const CareerGuidance = ({ onRestart }: CareerGuidanceProps) => {
  const careerRoles = [
    {
      title: "Health Educator",
      category: "Community Health",
      salary: "$45,000 - $65,000",
      outlook: "7% growth (Faster than average)",
      location: "Healthcare facilities, nonprofits, government",
      description: "Develop and implement educational programs to promote health and wellness in communities.",
      skills: ["Program Development", "Public Speaking", "Health Assessment", "Cultural Competency"],
      requirements: ["Bachelor's degree in Health Education or related field", "CHES certification preferred", "2+ years experience"]
    },
    {
      title: "Community Health Worker",
      category: "Direct Service",
      salary: "$37,000 - $52,000", 
      outlook: "11% growth (Much faster than average)",
      location: "Community health centers, homes, community sites",
      description: "Provide direct support and advocacy for individuals and communities to improve health outcomes.",
      skills: ["Case Management", "Cultural Navigation", "Basic Health Screening", "Community Outreach"],
      requirements: ["High school diploma + training", "Certification varies by state", "Community connections valued"]
    },
    {
      title: "Public Health Specialist", 
      category: "Policy & Research",
      salary: "$52,000 - $78,000",
      outlook: "5% growth (Average)",
      location: "Government agencies, research institutions, NGOs",
      description: "Analyze health data, develop policies, and coordinate public health initiatives.",
      skills: ["Data Analysis", "Policy Development", "Research Methods", "Grant Writing"],
      requirements: ["Master's in Public Health preferred", "Statistical analysis skills", "Research experience"]
    },
    {
      title: "Wellness Coordinator",
      category: "Corporate Wellness",
      salary: "$42,000 - $58,000",
      outlook: "8% growth (Faster than average)",
      location: "Corporations, hospitals, fitness centers",
      description: "Design and manage workplace wellness programs to improve employee health and reduce costs.",
      skills: ["Program Management", "Health Coaching", "Data Tracking", "Vendor Relations"],
      requirements: ["Bachelor's in Health Promotion", "Wellness certification", "Program management experience"]
    }
  ];

  const skillCategories = [
    {
      category: "Core Health Education Skills",
      skills: [
        { name: "Health Needs Assessment", importance: 95, description: "Evaluate community health status and needs" },
        { name: "Program Planning & Implementation", importance: 90, description: "Design and execute health education programs" },
        { name: "Health Communication", importance: 88, description: "Effectively convey health information to diverse audiences" },
        { name: "Evaluation & Research", importance: 82, description: "Assess program effectiveness and conduct health research" }
      ]
    },
    {
      category: "Interpersonal Skills",
      skills: [
        { name: "Cultural Competency", importance: 92, description: "Work effectively across diverse populations" },
        { name: "Public Speaking", importance: 85, description: "Present to groups and facilitate discussions" },
        { name: "Counseling & Support", importance: 78, description: "Provide guidance and emotional support" },
        { name: "Collaboration", importance: 80, description: "Work with healthcare teams and community partners" }
      ]
    },
    {
      category: "Technical Skills",
      skills: [
        { name: "Data Analysis", importance: 75, description: "Analyze health data and program metrics" },
        { name: "Technology Proficiency", importance: 70, description: "Use health information systems and digital tools" },
        { name: "Grant Writing", importance: 65, description: "Secure funding for health programs" },
        { name: "Quality Improvement", importance: 72, description: "Implement continuous improvement processes" }
      ]
    }
  ];

  const learningResources = [
    {
      category: "Professional Development",
      resources: [
        {
          title: "National Commission for Health Education Credentialing (NCHEC)",
          type: "Certification",
          description: "CHES and MCHES certification programs",
          url: "https://nchec.org",
          duration: "Ongoing"
        },
        {
          title: "Society for Public Health Education (SOPHE)",
          type: "Professional Organization",
          description: "Continuing education and networking opportunities",
          url: "https://sophe.org",
          duration: "Membership"
        }
      ]
    },
    {
      category: "Formal Education",
      resources: [
        {
          title: "Bachelor's in Health Education",
          type: "Degree Program",
          description: "Undergraduate foundation in health education principles",
          url: "#",
          duration: "4 years"
        },
        {
          title: "Master of Public Health (MPH)",
          type: "Graduate Degree",
          description: "Advanced training in public health and health education",
          url: "#",
          duration: "2 years"
        }
      ]
    },
    {
      category: "Online Learning",
      resources: [
        {
          title: "Public Health 101",
          type: "Online Course",
          description: "Introduction to public health concepts - Johns Hopkins",
          url: "#",
          duration: "8 weeks"
        },
        {
          title: "Health Communication Strategies",
          type: "Specialization",
          description: "UC San Diego health communication program",
          url: "#",
          duration: "4 months"
        }
      ]
    }
  ];

  const nextSteps = [
    {
      step: 1,
      title: "Assess Your Current Position",
      description: "Review your assessment results and identify priority development areas",
      timeline: "This week",
      actions: [
        "Download and review your detailed assessment report",
        "Identify your top 3 strength areas and top 3 growth areas",
        "Research specific roles that match your current skill level"
      ]
    },
    {
      step: 2,
      title: "Create Your Learning Plan",
      description: "Develop a structured approach to building required skills",
      timeline: "Next 2 weeks",
      actions: [
        "Select 2-3 courses from the recommended learning path",
        "Set up a study schedule with realistic timelines",
        "Join relevant professional associations for networking"
      ]
    },
    {
      step: 3,
      title: "Gain Practical Experience",
      description: "Apply your learning through hands-on opportunities",
      timeline: "3-6 months",
      actions: [
        "Volunteer with local health organizations",
        "Shadow experienced health educators",
        "Complete an internship or practicum if possible"
      ]
    },
    {
      step: 4,
      title: "Build Your Professional Network",
      description: "Connect with professionals and explore job opportunities",
      timeline: "Ongoing",
      actions: [
        "Attend health education conferences and events",
        "Join online professional communities",
        "Connect with mentors in your areas of interest"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 mb-4">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">Career & Learning Guidance</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Your Health Education Career Roadmap</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore career opportunities, required skills, and create your personalized 
            path to success in health education.
          </p>
        </div>

        <Tabs defaultValue="careers" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="careers">Career Roles</TabsTrigger>
            <TabsTrigger value="skills">Skill Mapping</TabsTrigger>
            <TabsTrigger value="learning">Learning Resources</TabsTrigger>
            <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
          </TabsList>

          {/* Career Roles Tab */}
          <TabsContent value="careers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {careerRoles.map((role, index) => (
                <Card key={index} className="assessment-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{role.title}</h3>
                      <Badge variant="secondary">{role.category}</Badge>
                    </div>
                    <TrendingUp className="w-6 h-6 text-success" />
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{role.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <DollarSign className="w-4 h-4 text-success" />
                      <span className="font-medium">{role.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span>{role.outlook}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{role.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Key Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Requirements</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {role.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start space-x-2">
                          <div className="bg-primary/10 rounded-full p-1 mt-1">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          </div>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-8">
            {skillCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="assessment-card p-6">
                <h3 className="text-xl font-semibold mb-6">{category.category}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{skill.name}</h4>
                        <Badge variant="outline" className="text-primary">
                          {skill.importance}% importance
                        </Badge>
                      </div>
                      <Progress value={skill.importance} className="h-2" />
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Learning Resources Tab */}
          <TabsContent value="learning" className="space-y-8">
            {learningResources.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="assessment-card p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-secondary" />
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="border border-border/50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{resource.title}</h4>
                          <Badge variant="outline" className="mt-1">
                            {resource.type}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {resource.duration}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Learn More
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Next Steps Tab */}
          <TabsContent value="next-steps" className="space-y-6">
            {nextSteps.map((step, index) => (
              <Card key={index} className="assessment-card p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <Badge variant="outline" className="text-primary">
                        {step.timeline}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <div>
                      <h4 className="font-semibold mb-3">Action Items:</h4>
                      <ul className="space-y-2">
                        {step.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start space-x-3">
                            <div className="bg-success/10 rounded-full p-1 mt-1">
                              <div className="w-2 h-2 bg-success rounded-full"></div>
                            </div>
                            <span className="text-sm">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Button 
            onClick={onRestart}
            className="btn-assessment"
          >
            Take Assessment Again
          </Button>
          
          <Button 
            variant="outline"
            className="flex items-center"
          >
            <FileText className="w-4 h-4 mr-2" />
            Download Career Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerGuidance;