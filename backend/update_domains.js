const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/crestDB')
    .then(() => console.log('MongoDB Connected for Domains Update'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err.message);
        process.exit(1);
    });

const Domain = require('./models/Domain');

const updateDomains = async () => {
    try {
        console.log('Clearing existing Domains...');
        await Domain.deleteMany();

        console.log('Inserting new Core Domains...');
        const newDomains = [
            {
                title: "Robotics & AI",
                icon: "<Cpu size={32} />",
                colorTheme: "cyan",
                description: "“Designing intelligent machines that bridge the gap between automation and human intelligence through embedded systems and smart robotics.”",
                order: 1
            },
            {
                title: "AI / ML",
                icon: "<BrainCircuit size={32} />",
                colorTheme: "magenta",
                description: "“Empowering data-driven decision making through predictive models, deep learning architectures, and real-time intelligent systems.”",
                order: 2
            },
            {
                title: "Cybersecurity",
                icon: "<View size={32} />", // Will update icon mapping in frontend if needed
                colorTheme: "green",
                description: "“Securing digital ecosystems by identifying vulnerabilities, preventing threats, and building resilient defense architectures.”",
                order: 3
            },
            {
                title: "Cloud Computing",
                icon: "<Globe size={32} />",
                colorTheme: "yellow",
                description: "“Enabling scalable application deployment and distributed computing using modern DevOps and virtualized infrastructure.”",
                order: 4
            },
            {
                title: "Aerospace",
                icon: "<Radio size={32} />", // Will update mapping in frontend
                colorTheme: "magenta",
                description: "“Exploring advanced flight systems and space technologies through simulation, propulsion design, and control systems.”",
                order: 5
            },
            {
                title: "Electronics",
                icon: "<Blocks size={32} />",
                colorTheme: "cyan",
                description: "“Engineering real-world hardware solutions using microcontrollers, circuit design, and integrated embedded platforms.”",
                order: 6
            },
        ];

        await Domain.insertMany(newDomains);
        console.log('✅ 6 New Core Domains successfully inserted');

        process.exit(0);
    } catch (err) {
        console.error('Update Error:', err);
        process.exit(1);
    }
};

updateDomains();
