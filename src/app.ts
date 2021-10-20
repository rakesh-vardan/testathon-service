import { ErrorObject } from 'ajv';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

import { Validator, ValidationError, List } from "express-json-validator-middleware";

const { validate } = new Validator();

function validationErrorMiddleware(error: { validationErrors: any; }, request: any, response: { headersSent: any; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { errors: List<ErrorObject[]>; }): void; new(): any; }; }; }, next: (arg0: undefined) => void) {
    if (response.headersSent) {
        return next(error);
    }

    const isValidationError = error instanceof ValidationError;
    if (!isValidationError) {
        return next(error);
    }

    response.status(400).json({
        errors: error.validationErrors,
    });

    next();
}

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))


const stockSchema = {
    type: "object",
    required: ["period", "stockData", "highestClosingPrice"],
    properties: {
        period: {
            type: "object",
            required: ["startDate", "endDate"],
            properties: {
                startDate: {
                    type: "string",
                    minLength: 1,
                    format: "date"
                },
                endDate: {
                    type: "string",
                    minLength: 1,
                    format: "date"
                }
            }
        },
        stockData: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    date: {
                        type: "string",
                        minLength: 1,
                        format: "date"
                    },
                    value: {
                        type: "integer",
                        minimum: 1
                    }
                },
                required: ["date", "value"],
            },
        },
        highestClosingPrice: {
            type: "integer",
            minimum: 1,
        },
    }
};

app.get("/", (req, res) => {
    res.send('Hello, your service is working!')
})

app.get("/api/videos/title", (req, res) => {

    const titles = ["Do your part to be Cyber Smart", "Achieving Security at Cloud Scale with Cybersecurity by Design", "Your workforce is now remote – how can you maintain security?", "Work with EPAM to architect trusted cloud adoption and achieve security at cloud scale", "Build a secure future for all your connected devices with Cybersecurity by Design", "Build the trusted future with security at agile speed", "The 3 Segments of Transitioning to Zero Trust", "6 Steps to Move Towards a Zero Trust Model", "Multiple Paths to Zero Trust", "Principles of Zero Trust", "eKids inclusive Program. IT summer camp", "#InsideEPAM: Benjamin Lim, Senior Business Analyst", "Developer productivity with VIM", "EPAM Embraces Digital Transformation and Remote Work in the ‘New Normal’", "Intro to EPAM’s FIX Protocol Products: FIX Integrated Control Center, FIX Client Simulator, & FIXEye", "#InsideEPAM: Meet Koy, Software Engineer", "#InsideEPAM: Meet Zac, Data Scientist", "I’m Engineering the Future | Join EPAM", "1000 trees for 10 years of EPAM in Poland", "Careers at EPAM", "EPAM without Borders, Malaga Spain Office", "EPAM’s Headless Commerce Accelerator for Salesforce Commerce Cloud", "Coolest Projects - Empowering young minds in STEM to create with Technology (Interview)", "At EPAM, we make “work from home” work", "Together As One: EPAM's Response to COVID-19 (short version)", "Together As One: EPAM's Response to COVID-19", "Arkadiy Dobkin Speaks at SAP NOW Online 2020", "Immunisation Pass – EPAM's EUvsVirus Hackathon Entry", "COVID Resistance Application", "EPAM & Curogram Partner to Scale COVID-19 Crisis Response Telemedicine Platform", "EPAM’s Learning Series – A talk by Ashim Srivastava, Director, EPAM India", "Solving the Content Crisis with Sitecore Content Hub", "#IamRemarkable: Empowering Employees at EPAM", "EPAM’s 2019 Year In Review", "Volunteer Day 2019", "EPAM India 2019 in review", "EPAM Continuum Debuts NXT Report on 20 Trends Shaping 2020", "EPAM’s Learning Series – A talk by Rashma Raveendra, Senior Director I EPAM India", "EPAM’s Learning Series – A talk by Naresh Sutravey, Chief Business Analyst I EPAM India", "EPAM & RTL: Delivering a Customer-Centric OTT Media Platform", "EPAM’s New Office in Guadalajara", "P27: Connecting the Nordics & Enabling Cross-Border Payments | Alistair Brown", "OSDU Forum: Looking Forward", "Interview with Patrick Allen, Principal, Healthcare Business Consulting at World Healthcare Congress", "Keys to Prosperity for Neobanks: An Interview with Peter Cronin", "EPAM's Q3 2019 in review", "EPAM & Liberty Global Present at Big Data Expo 2019", "How Banks Can Ensure Successful Open Banking & Instant Payments Initiatives | Alistair Brown", "EPAM & SAP: Brussels Airport Customer Story", "Interview with Jeff Kim, EPAM Life Sciences Consultant"];
    const random = Math.floor(Math.random() * titles.length);

    res.json({
        title: titles[random]
    });
})

app.post(
    "/api/stocks/data",
    validate({ body: stockSchema }),
    function createUserRouteHandler(request, response, next) {
        response.json({
            result: "Passed"
        });

        next();
    }
);

app.use(validationErrorMiddleware);

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started on port: ${PORT}`);
})
