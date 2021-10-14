const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))


app.get("/", (req, res) => {
    res.send('Hello, your service is working!')
})

app.get("/api/videos/title", (req, res) => {

    const titles = ["Do your part to be Cyber Smart", "Achieving Security at Cloud Scale with Cybersecurity by Design", "Your workforce is now remote – how can you maintain security?", "Work with EPAM to architect trusted cloud adoption and achieve security at cloud scale", "Build a secure future for all your connected devices with Cybersecurity by Design", "Build the trusted future with security at agile speed", "The 3 Segments of Transitioning to Zero Trust", "6 Steps to Move Towards a Zero Trust Model", "Multiple Paths to Zero Trust", "Principles of Zero Trust", "eKids inclusive Program. IT summer camp", "#InsideEPAM: Benjamin Lim, Senior Business Analyst", "Developer productivity with VIM", "EPAM Embraces Digital Transformation and Remote Work in the ‘New Normal’", "Intro to EPAM’s FIX Protocol Products: FIX Integrated Control Center, FIX Client Simulator, & FIXEye", "#InsideEPAM: Meet Koy, Software Engineer", "#InsideEPAM: Meet Zac, Data Scientist", "I’m Engineering the Future | Join EPAM", "1000 trees for 10 years of EPAM in Poland", "Careers at EPAM", "EPAM without Borders, Malaga Spain Office", "EPAM’s Headless Commerce Accelerator for Salesforce Commerce Cloud", "Coolest Projects - Empowering young minds in STEM to create with Technology (Interview)", "At EPAM, we make “work from home” work", "Together As One: EPAM's Response to COVID-19 (short version)", "Together As One: EPAM's Response to COVID-19", "Arkadiy Dobkin Speaks at SAP NOW Online 2020", "Immunisation Pass – EPAM's EUvsVirus Hackathon Entry", "COVID Resistance Application", "EPAM & Curogram Partner to Scale COVID-19 Crisis Response Telemedicine Platform", "EPAM’s Learning Series – A talk by Ashim Srivastava, Director, EPAM India", "Solving the Content Crisis with Sitecore Content Hub", "#IamRemarkable: Empowering Employees at EPAM", "EPAM’s 2019 Year In Review", "Volunteer Day 2019", "EPAM India 2019 in review", "EPAM Continuum Debuts NXT Report on 20 Trends Shaping 2020", "EPAM’s Learning Series – A talk by Rashma Raveendra, Senior Director I EPAM India", "EPAM’s Learning Series – A talk by Naresh Sutravey, Chief Business Analyst I EPAM India", "EPAM & RTL: Delivering a Customer-Centric OTT Media Platform", "EPAM’s New Office in Guadalajara", "P27: Connecting the Nordics & Enabling Cross-Border Payments | Alistair Brown", "OSDU Forum: Looking Forward", "Interview with Patrick Allen, Principal, Healthcare Business Consulting at World Healthcare Congress", "Keys to Prosperity for Neobanks: An Interview with Peter Cronin", "EPAM's Q3 2019 in review", "EPAM & Liberty Global Present at Big Data Expo 2019", "How Banks Can Ensure Successful Open Banking & Instant Payments Initiatives | Alistair Brown", "EPAM & SAP: Brussels Airport Customer Story", "Interview with Jeff Kim, EPAM Life Sciences Consultant"];

    const random = Math.floor(Math.random() * titles.length);
    console.log(random, titles[random]);

    res.json({
        title: titles[random]
    });
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 3000");
})
