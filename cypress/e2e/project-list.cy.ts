import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";
import { ProjectStatus } from "@api/projects.types";

// Cypress fixtures are used to store test data for automation, and the fixtures folder is placed inside the Cypress project. The fixtures folder contains JSON files, which contain test data that can be read by multiple tests

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders a loading spinner", () => {
      // setup request mock wait some time before continuing
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        // delayMs: 100,
        fixture: "projects.json",
      });

      // during wait, open project page
      cy.visit(`http://localhost:3000/dashboard`);

      // fetch spinner
      cy.get('[data-cy="loading"]').should("be.visible");
      // request is resolved, spinner should be removed.
      cy.get('[data-cy="loading"]').should("not.exist");
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          const status = mockProjects[index].status;
          const statusTexts: { [index: string]: string } = {
            [ProjectStatus.info]: "stable",
            [ProjectStatus.warning]: "warning",
            [ProjectStatus.error]: "critical",
          };
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(capitalize(statusTexts[status]));
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });

    it("provides each project status with its appropriate color", () => {
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          const statusColors: { [index: string]: string } = {
            [ProjectStatus.info]: "rgb(2, 122, 72)",
            [ProjectStatus.warning]: "rgb(181, 71, 8)",
            [ProjectStatus.error]: "rgb(180, 35, 24)",
          };
          // get element
          const element = cy.wrap($el).find("div[class^='badge_container']");
          // get status
          const status = mockProjects[index].status;
          // check proper color for status

          element.should("have.css", "color", statusColors[status]);
        });
    });

    it("provides appropriate text for each project status", () => {
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          const statusTexts: { [index: string]: string } = {
            [ProjectStatus.info]: "stable",
            [ProjectStatus.warning]: "warning",
            [ProjectStatus.error]: "critical",
          };
          // get element
          const element = cy.wrap($el).find("div[class^='badge_container']");
          // get status
          const status = mockProjects[index].status;
          // check proper color for status

          element.invoke("text").should("eq", capitalize(statusTexts[status]));
        });
    });
  });
});
