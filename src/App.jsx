import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image from "./assets/abdikarim.png";
import agecalculater from "./assets/ageCalculater.png";
import countdown from "./assets/countdown.png";
import moshify from "./assets/moshify.png";
import RepairShop from "./assets/Repair Shop.png";
import tailwis from "./assets/tailwis.png";
import digitalclock from "./assets/digitalclock.png";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Project data
  const projects = [
    {
      id: 1,
      title: "Age Calculater",
      description:
        "A clean, glowing UI web app that calculates your exact age from your birth date. Built with HTML, CSS, and JavaScript to practice date logic and front-end design.",
      tags: ["HTML", "CSS", "JARVASCRIT"],
      image: agecalculater,
      link: "https://cabdikariim242.github.io/30-HTML-CSS-JS-colored/New%20Year%20Count%20Down/index.html",
    },
    {
      id: 2,
      title: "Moshify",
      description:
        "A modern, fast, and fully responsive landing page showcasing cloud hosting solutions with clean UI and smooth performance.",
      tags: ["HTML", "CSS", "JARVASCRIT", "TAILWIND CSS"],
      image: moshify,
      link: "https://cabdikariim242.github.io/Moshify/",
    },
    {
      id: 3,
      title: "Repair Shop Management System",
      description:
        "Inventory and sales management system designed for small businesses to track services, prices, and customer transactions efficiently.",
      tags: ["HTML", "CSS", "JARVASCRIT", "VUE", "TAILWIND CSS"],
      image: RepairShop,
      link: "https://calculation-proj.vercel.app/",
    },
    {
      id: 4,
      title: "Digital Clock Web Application",
      description:"A sleek, responsive digital clock with real-time updates, designed to display the current time in an intuitive and visually appealing layout.",
      tags: ["HTML", "CSS", "JARVASCRIT"],
      image: digitalclock,
      link: "https://cabdikariim242.github.io/30-HTML-CSS-JS-PROJECTS/Digital%20clock/index.html",
    },
    {
      id: 5,
      title: "Interactive Button Component Design",
      description:"A versatile button component with multiple color styles (Primary, Success, Warning, Danger) designed for smooth user interactions and easy integration into any project.",
      tags: ["HTML", "CSS", "JARVASCRIT", "VUE", "TAILWIND CSS"],
      image: tailwis,
      link: "https://vue-setup.vercel.app/",
    },
    {
      id: 6,
      title: "New Year Countdown Timer",
      description:"An interactive countdown timer with real-time updates, designed to track the time remaining until the New Year in a vibrant and visually appealing layout.",
      tags: ["HTML", "CSS", "JARVASCRIT"],
      image: countdown,
      link: "https://cabdikariim242.github.io/30-HTML-CSS-JS-colored/New%20Year%20Count%20Down/index.html",
    },
  ];

  // Skill data
  const skills = {
    frontend: [
      "Html",
      "Css",
      "Javascript",
      "vue",
      "React",
      "TypeScript",
      ,
      "Tailwind CSS",
    ],
    backend: ["Python", "php", "C", "C++"],
    tools: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Vite",
      "npm",
      "Figma",
      "Netlify",
    ],
  };

  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  // Handle mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Setup canvas for interactive background
  useEffect(() => {
    if (canvasRef.current && theme === "dark") {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let particles = [];
      const particleCount = 100;

      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 1;
          this.speedX = Math.random() * 1 - 0.5;
          this.speedY = Math.random() * 1 - 0.5;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
          if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }

        draw() {
          ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const createParticles = () => {
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();

          // Connect particles with lines
          for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1000})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        requestAnimationFrame(animate);
      };

      createParticles();
      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [theme]);

  // Handle scroll and set active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme between dark and light
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } transition-colors duration-500 overflow-hidden`}
    >
      {/* Animated background */}
      {theme === "dark" && (
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full opacity-30 pointer-events-none z-0"
        />
      )}

      {/* Custom cursor effect */}
      <div
        className="fixed w-6 h-6 rounded-full border border-blue-500 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50 transition-transform duration-100 ease-out"
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
      />
      <div
        className="fixed w-2 h-2 rounded-full bg-blue-500 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50 transition-transform duration-300 ease-out"
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
      />

      {/* Navigation */}
      <nav
        className={`fixed w-full py-4 px-6 z-40 backdrop-blur-md ${
          theme === "dark" ? "bg-black/30" : "bg-white/80"
        } border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-xl"
          >
            <span className="text-blue-500">Abdikarim</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`relative py-2 px-1 font-medium transition-all duration-300 ${
                  activeSection === item
                    ? "text-blue-500"
                    : "hover:text-blue-400"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                {activeSection === item && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-200"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div
              className={`w-6 h-0.5 ${
                theme === "dark" ? "bg-white" : "bg-gray-900"
              } transition-all duration-300 ${
                isMenuOpen ? "transform rotate-45 translate-y-1.5" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 ${
                theme === "dark" ? "bg-white" : "bg-gray-900"
              } my-1.5 transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <div
              className={`w-6 h-0.5 ${
                theme === "dark" ? "bg-white" : "bg-gray-900"
              } transition-all duration-300 ${
                isMenuOpen ? "transform -rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-16 left-0 right-0 z-30 md:hidden ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } shadow-lg`}
          >
            <div className="flex flex-col p-4 space-y-4">
              {["home", "about", "skills", "projects", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`py-3 px-4 text-left rounded-lg transition-all duration-300 ${
                      activeSection === item
                        ? theme === "dark"
                          ? "bg-blue-900 text-blue-100"
                          : "bg-blue-100 text-blue-900"
                        : theme === "dark"
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto px-6 z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Creative <span className="text-blue-500">Developer</span> &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Digital Designer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
          >
            I build innovative digital experiences that blend cutting-edge
            technology with beautiful design
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors duration-300 shadow-lg"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full font-medium transition-all duration-300"
            >
              Get In Touch
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection("about")}
            className="p-2 rounded-full border"
            aria-label="Scroll down"
          >
            ↓
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            About <span className="text-blue-500">Me</span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className={`rounded-lg overflow-hidden shadow-xl ${
                  theme === "dark"
                    ? "ring-1 ring-gray-800"
                    : "ring-1 ring-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt="Professional developer working in a modern office environment"
                  className="w-full h-auto"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-center p-4 shadow-lg">
                1+ Years Experience
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">
                Crafting Digital Excellence
              </h3>
              <p className="text-lg mb-6">
                I'm a passionate Front-end developer and UI/UX designer with
                more than a year of experience building responsive, user-focused
                web applications. I work across the stack — front-end with HTML,
                CSS, JavaScript, Vue, React, TypeScript, Tailwind CSS; and
                back-end with Python, PHP, and C/C++ — focusing on clean,
                maintainable code and polished interfaces.
              </p>
              <p className="text-lg mb-8">
                I combine technical problem-solving with practical design
                thinking to turn ideas into working products. I enjoy improving
                usability, iterating from feedback, and shipping solutions that
                are both simple and effective. Always learning and open to
                collaboration.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div
                  className={`p-4 rounded-lg ${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <div className="text-3xl font-bold text-blue-500">50+</div>
                  <div className="text-sm">Projects Completed</div>
                </div>

                <div
                  className={`p-4 rounded-lg ${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <div className="text-3xl font-bold text-blue-500">1+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <div className="text-3xl font-bold text-blue-500">15+</div>
                  <div className="text-sm">Technologies Mastered</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 px-6 bg-gradient-to-r from-blue-900 to-purple-900 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            My <span className="text-blue-400">Skills</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/10`}
              >
                <h3 className="text-xl font-bold mb-6 text-blue-300 capitalize">
                  {category} Stack
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {items.map((skill) => (
                    <div key={skill} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 bg-black/20 p-8 rounded-xl border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">My Approach</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/5 rounded-lg">
                <div className="text-4xl mb-4">🎨</div>
                <h4 className="font-bold mb-2">Design First</h4>
                <p className="text-sm">
                  Creating intuitive, beautiful interfaces that prioritize user
                  experience
                </p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-lg">
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="font-bold mb-2">Performance</h4>
                <p className="text-sm">
                  Optimizing for speed and efficiency across all devices and
                  platforms
                </p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-lg">
                <div className="text-4xl mb-4">🔒</div>
                <h4 className="font-bold mb-2">Security</h4>
                <p className="text-sm">
                  Implementing robust security practices to protect user data
                  and privacy
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            Featured <span className="text-blue-500">Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center text-lg mb-16 max-w-3xl mx-auto"
          >
            A selection of my recent work that showcases my skills and creative
            approach to problem solving
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`rounded-xl overflow-hidden group cursor-pointer ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } shadow-lg hover:shadow-xl transition-all duration-300`}
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={`Screenshot of ${project.title} project`}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium">
                      <a href={project.link}> View Project</a>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p
                    className={`mb-4 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
          
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-6 bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-4xl mx-auto ">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            Get In <span className="text-blue-500">Touch</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center text-lg mb-12 max-w-2xl mx-auto"
          >
            Have a project in mind or want to discuss potential opportunities?
            I'd love to hear from you!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`rounded-xl p-8 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } shadow-lg`}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <div
              className={`p-6 rounded-xl text-center ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <div className="text-3xl mb-4">📧</div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-blue-500">
  <a href="mailto:abdikarim.dev01@gmail.com">abdikarim.dev01@gmail.com</a>
</p>
            </div>
            <div
              className={`p-6 rounded-xl text-center ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <div className="text-3xl mb-4">📍</div>
              <h3 className="font-bold mb-2">Location</h3>
              <p>Mogadishu, Banaadir, Somalia</p>
            </div>
            <div
              className={`p-6 rounded-xl text-center ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <div className="text-3xl mb-4">🌐</div>
              <h3 className="font-bold mb-2">Social</h3>
              <div className="flex justify-center space-x-4">
                <a href="https://www.linkedin.com/in/abdikarim-dev-b6a94b388/" className="text-blue-500 hover:text-blue-700">
                  LinkedIn
                </a>
                <a href="https://github.com/cabdikariim242/" className="text-blue-500 hover:text-blue-700">
                  GitHub
                </a>
                <a href="https://x.com/AbdikarimD31284" className="text-blue-500 hover:text-blue-700">
                  Twitter
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 px-6 text-center ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        } border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}
      >
        <p>
          © {new Date().getFullYear()}  [Abdikarim]. All rights reserved. |My Portfolio. Designed and built with ❤️
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;
