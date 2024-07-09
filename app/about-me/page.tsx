import React from "react";

interface Props {}

const AboutMe: React.FC<Props> = () => {
  const containerStyles = " flex-col  w-[80vw] max-w-[800px] gap";
  const headingStyles = "text-2xl font-bold text-black mb-4";
  const sectionStyles = "mb-6 bg-white p-8 rounded-lg shadow-md";
  const listStyles = "list-disc list-inside";
  const listItemStyles = "text-black mb-2";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
      <div className={`${containerStyles}`}>
        <section className={sectionStyles}>
          <h1 className={headingStyles}>Connor Barroso</h1>
          <p className="text-black">
            Gatineau, QC | +1 (873) 288-0441 | connor.barroso@gmail.com |{" "}
            <a
              className="text-blue-700"
              href="https://www.linkedin.com/in/connor-barroso-926513217/"
            >
              LinkedIn
            </a>{" "}
            |{" "}
            <a
              className="text-blue-700"
              href="https://github.com/ConnorBarroso"
            >
              GitHub
            </a>
          </p>
        </section>

        <section className={sectionStyles}>
          <h2 className={headingStyles}>Introduction</h2>
          <p className="text-black">
            Tech-savvy Full-Stack Web Developer with strong technical experience
            in software engineering, full-stack development, project management,
            and agile methodologies across various roles. Highly skilled in
            collaborating with cross-functional teams, driving the delivery of
            high-quality full-stack web applications, and delivering
            high-quality, scalable software code solutions in collaborative
            settings.
          </p>
        </section>

        <section className={sectionStyles}>
          <h2 className={headingStyles}>Background</h2>
          <p className="text-black">
            Adept at developing scalable and efficient web applications using
            web development technologies, including Typescript/Javascript,
            React, MongoDB, Next, and Node.js. My experience spans various roles
            where I have successfully led and contributed to projects that
            demanded robust problem-solving skills and a deep understanding of
            both frontend and backend technologies.
          </p>
        </section>

        <section className={sectionStyles}>
          <h2 className={headingStyles}>Core Competencies</h2>
          <ul className={listStyles}>
            <li className={listItemStyles}>Full Stack Development</li>
            <li className={listItemStyles}>Project Management</li>
            <li className={listItemStyles}>Agile/Scrum Methodologies</li>
            <li className={listItemStyles}>UX Design Implementation</li>
            <li className={listItemStyles}>Technical Problem-solving</li>
            <li className={listItemStyles}>Team Management</li>
            <li className={listItemStyles}>Web Application Development</li>
            <li className={listItemStyles}>Security Implementation</li>
            <li className={listItemStyles}>
              Software Testing and Quality Assurance
            </li>
            <li className={listItemStyles}>
              Front-end & Back-end Technologies
            </li>
            <li className={listItemStyles}>Development Process Management</li>
            <li className={listItemStyles}>API Development and Integration</li>
          </ul>
        </section>

        <section className={sectionStyles}>
          <h2 className={headingStyles}>Technical Skills</h2>
          <p className="text-black">
            Frontend Development: JavaScript, ES6, TypeScript, Next.js,
            React.js, Redux, HTML5, Flexbox, CSS3, Tailwind, Styled Components
            <br />
            Backend Development: Node.js, Express, MongoDB, postgreSQL, HTTP,
            JSON, AWS
            <br />
            Testing & Version Control: Mocha, Chai, Jest, Git
            <br />
            Deployment, Continuous Integration and Hosting: Vercel
            <br />
            Office Tools: Microsoft Office Suite, Google Workspace, Slack, Zoom,
            Jira
            <br />
            Social skills: Team collaboration, Attentiveness, Leadership and
            Management, Conflict resolution
            <br />
            Language: English (Native)
          </p>
        </section>
      </div>
    </main>
  );
};

export default AboutMe;
