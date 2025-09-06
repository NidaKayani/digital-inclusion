interface TeamMember {
  name: string;
  role: string;
  description: string;
  borderColor: string;
  roleColor: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Alisha Kayani",
    role: "Team Lead",
    description:
      "Alisha leads the team and guides the strategic direction of our product and learning experience.",
    borderColor: "border-blue-500",
    roleColor: "text-blue-600",
  },
  {
    name: "Asma Iqbal",
    role: "Quality Assurance",
    description:
      "Asma ensures reliability and quality across releases, validating features for all devices and bandwidth conditions.",
    borderColor: "border-purple-500",
    roleColor: "text-purple-600",
  },
  {
    name: "Aminah Ali",
    role: "UI Analytics",
    description:
      "Amna analyzes UI usage and behavior to optimize usability, accessibility, and engagement.",
    borderColor: "border-green-500",
    roleColor: "text-green-600",
  },
];

export default function TeamSection() {
  return (
    <section className="container mx-auto px-4 py-24">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
        Meet Our Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card p-8 text-center">
            <div className="relative w-fit mx-auto mb-4">
              <span className="absolute inset-0 rounded-full blur-md opacity-30 bg-blue-300"></span>
              <img
                src={`https://placehold.co/150x150/e2e8f0/000?text=${member.name}`}
                alt={member.name}
                className={`relative rounded-full w-28 h-28 mx-auto object-cover border-4 glow-ring ${member.borderColor}`}
              />
            </div>
            <h3 className="font-bold text-2xl text-gray-900">{member.name}</h3>
            <p className={`${member.roleColor} font-medium mt-1`}>
              {member.role}
            </p>
            <p className="mt-2 text-gray-600 leading-relaxed">
              {member.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
