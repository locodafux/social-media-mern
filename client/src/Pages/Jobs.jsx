import { useState } from "react";

export default function Jobs() {
  const [jobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Techify Solutions",
      location: "Remote",
      description:
        "Build and maintain responsive web interfaces using modern JavaScript frameworks and tools.",
      type: "Full-time",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "DesignHub",
      location: "Manila",
      description:
        "Design user-centered web and mobile app interfaces, focusing on clean and functional user experiences.",
      type: "Contract",
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "DataCore Labs",
      location: "Cebu",
      description:
        "Develop and maintain scalable APIs, manage databases, and optimize performance for production systems.",
      type: "Full-time",
    },
  ]);

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const filteredJobs = jobs.filter(
    (j) =>
      (j.title.toLowerCase().includes(query.toLowerCase()) ||
        j.company.toLowerCase().includes(query.toLowerCase())) &&
      (location === "" || j.location === location)
  );

  const apply = (job) => {
    alert(`You applied for ${job.title} at ${job.company}`);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#061022] to-[#07111a] text-[#e6eef8] font-inter w-full">


      {/* Filter Bar */}
      <div className="w-full max-w-4xl flex gap-3 mt-8 px-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for jobs or companies..."
          className="flex-1 px-4 py-2 rounded-lg border border-white/10 bg-transparent text-[#e6eef8] placeholder:text-[#98a0b3] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-white/10 bg-transparent text-[#e6eef8] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Locations</option>
          <option>Remote</option>
          <option>Manila</option>
          <option>Cebu</option>
        </select>
        <button className="bg-blue-500 hover:opacity-85 text-white font-semibold px-5 py-2 rounded-lg transition">
          Search
        </button>
      </div>

      {/* Job Listings */}
      <main className="w-full max-w-4xl mt-10 flex flex-col gap-5 px-5 pb-10">
        {filteredJobs.length === 0 ? (
          <div className="text-center text-[#98a0b3] mt-20 text-lg">
            No jobs found at the moment.
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-[#0b1220] rounded-xl border border-white/10 p-6 flex flex-col gap-2 hover:bg-white/5 hover:-translate-y-[2px] transition"
            >
              <div className="text-lg font-bold">{job.title}</div>
              <div className="text-blue-400 font-semibold text-sm">
                {job.company}
              </div>
              <div className="text-sm text-[#98a0b3] leading-relaxed">
                {job.description}
              </div>
              <div className="text-sm text-[#98a0b3]">{`${job.location} • ${job.type}`}</div>
              <button
                onClick={() => apply(job)}
                className="mt-2 bg-blue-500 hover:opacity-85 text-white font-semibold px-4 py-2 rounded-md self-start transition"
              >
                Apply Now
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
