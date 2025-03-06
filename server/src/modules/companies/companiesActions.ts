import type { RequestHandler } from "express";
import { z } from "zod";
import CompanySchema from "./companies.validation";
import companiesRepository from "./companiesRepository";

const browseCompanies: RequestHandler = async (req, res, next) => {
  try {
    const companies = await companiesRepository.readAllCompanies();
    res.json(companies);
  } catch (err) {
    next(err);
  }
};

const readCompany: RequestHandler = async (req, res, next) => {
  try {
    const user_id = Number(req.params.id);
    const company = await companiesRepository.read(user_id);

    if (company == null) {
      res.sendStatus(404);
    } else {
      res.json(company);
    }
  } catch (err) {
    next(err);
  }
};

const readCompanyProfil: RequestHandler = async (req, res, next) => {
  try {
    const user_id = req.body.user_id;
    const company = await companiesRepository.read(user_id);

    if (!company) {
      res.sendStatus(404);
      return;
    }

    req.body.company_id = company.id;

    next();
  } catch (err) {
    next(err);
  }
};

const uploadCompany: RequestHandler = async (req, res, next) => {
  try {
    const parsedData = await CompanySchema.parseAsync(req.body);

    const newCompany = {
      company_name: parsedData.company_name,
      sector: parsedData.sector,
      employee_number: parsedData.employee_number
        ? Number.parseInt(parsedData.employee_number)
        : undefined,
      description: parsedData.description,
      user_id: req.body.user_id,
      website_link: parsedData.website_link || "",
    };

    const insertId = await companiesRepository.create(newCompany);
    res.status(201).json();
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ errors: err.errors });
    }
    next(err);
  }
};

export default {
  browseCompanies,
  readCompany,
  readCompanyProfil,
  uploadCompany,
};
