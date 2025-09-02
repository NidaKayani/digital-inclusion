interface TeamMember {
  name: string;
  role: string;
  description: string;
  borderColor: string;
  roleColor: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Alisha",
    role: "Head of Education & Content",
    description: "Alisha is a curriculum design specialist, ensuring our learning paths are engaging, comprehensive, and tailored to meet the needs of all students.",
    borderColor: "border-blue-500",
    roleColor: "text-blue-600"
  },
  {
    name: "Raed",
    role: "Lead Engineer",
    description: "Raed is the architect behind our PWA and agentic system, ensuring the app is fast, reliable, and accessible even in low-connectivity environments.",
    borderColor: "border-purple-500",
    roleColor: "text-purple-600"
  },
  {
    name: "Lubna",
    role: "Community and Partnerships",
    description: "Lubna works directly with communities to understand their needs and build partnerships that help us extend our reach and impact.",
    borderColor: "border-yellow-500",
    roleColor: "text-yellow-600"
  },
  {
    name: "Sadia",
    role: "UX/UI Designer",
    description: "Sadia ensures the app's interface is intuitive and accessible, crafting a seamless experience for every user on any device.",
    borderColor: "border-green-500",
    roleColor: "text-green-600"
  }
];

export default function TeamSection() {
  return (
    <section className="container mx-auto px-4 py-24">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white p-8 rounded-3xl text-center section-card">
            <img 
              src={`https://placehold.co/150x150/e2e8f0/000?text=${member.name}`} 
              alt={member.name} 
              className={`rounded-full w-28 h-28 mx-auto mb-4 object-cover border-4 ${member.borderColor}`}
            />
            <h3 className="font-bold text-2xl text-gray-900">{member.name}</h3>
            <p className={`${member.roleColor} font-medium`}>{member.role}</p>
            <p className="mt-2 text-gray-600">{member.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
