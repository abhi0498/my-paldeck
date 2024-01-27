import { workSustainability } from "./../node_modules/.prisma/client/index.d";
import path from "path";
import { Page, chromium } from "playwright";
import fs from "fs/promises";
import fetch from "node-fetch";

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  // Navigate to a website
  //   await getPals(page);

  //   await getActiveSkills(page);

  //   await getImages(page);
  await downloadTypes();

  await browser.close();
})();

async function getActiveSkills(page: Page) {
  await page.goto("https://palworld.wiki.gg/wiki/Category:Active_Skills");
  const skillsSections = await page.$$("#mw-pages > div > div> div> ul> li>a");
  const skills = [];
  for (const section of skillsSections) {
    const name = await section.innerText();
    console.log(name);

    skills.push({
      name,
    });
  }

  for (let i = 0; i < skills.length; i++) {
    const skill: any = skills[i];
    await page.goto(
      `https://palworld.wiki.gg/wiki/${skill.name.replace(" ", "_")}`
    );
    await page.waitForLoadState("networkidle");

    skills[i] = {
      ...skill,
      type: await page
        .$(
          "#mw-content-text > div.mw-parser-output > aside > div:nth-child(2) > div > span > a:nth-child(2)"
        )
        .then((e) => e?.innerText()),
      ct: await page
        .$(
          "#mw-content-text > div.mw-parser-output > aside > section > section > section.pi-smart-group-body > div:nth-child(1)"
        )
        .then((e) => e?.innerText()),
      power: await page
        .$(
          "#mw-content-text > div.mw-parser-output > aside > section > section > section.pi-smart-group-body > div:nth-child(2)"
        )
        .then((e) => e?.innerText()),

      description: await page
        .$(
          "#mw-content-text > div.mw-parser-output > aside > div:nth-child(4) > div"
        )
        .then((e) => e?.innerText()),
    };
  }

  console.log(skills);
  await fs.writeFile(
    path.join("./activeSkills.json"),
    JSON.stringify(skills, null, 2)
  );
}

async function getPals(page: Page) {
  await page.goto("https://palworld.wiki.gg/wiki/Pals");
  // Do something on the website
  // ...
  //debug
  await page.waitForTimeout(1000);
  const pals = [];

  const table = await page.$("table");
  const rows = await table?.$$("tr > td:nth-child(1) > span > a:nth-child(2)")!;
  for (const row of rows) {
    const text = await row.innerText();
    console.log(text);
    pals.push({
      name: text,
    });
  }

  for (let i = 0; i < pals.length; i++) {
    const pal: any = pals[i];
    await page.goto(`https://palworld.wiki.gg/wiki/${pal.name}`);
    await page.waitForLoadState("networkidle");

    if ((await page.$("#pi-tab-1 > figure > a > img")) !== null) {
      const lore = await page
        .$("#mw-customcollapsible-paldeck > i")
        .then((e) => e?.innerText());
      const title = await page
        .$("#mw-content-text > div.mw-parser-output > aside > h2 > div > i")
        .then((e) => e?.innerText());

      const number = await page
        .$(
          "#mw-content-text > div.mw-parser-output > aside > section:nth-child(3) > div:nth-child(2) > div"
        )
        .then((e) => e?.innerText());

      const partnerSkill = {
        name: await page
          .$(
            "#mw-content-text > div.mw-parser-output > aside > section:nth-child(4) > div:nth-child(2) > div > b"
          )
          .then((e) => e?.innerText()),
        description: await page
          .$(
            "#mw-content-text > div.mw-parser-output > aside > section:nth-child(4) > div:nth-child(3) > div"
          )
          .then((e) => e?.innerText()),
      };

      const activeSkills = [];
      const section = await page.$(
        "#mw-content-text > div.mw-parser-output > aside > section:nth-child(5)"
      );
      // div data-source starts with active
      const children = await section?.$$("div[data-source^=active]")!;
      console.log(children.length);

      for (const child of children) {
        const level = await child.$("h3").then((e) => e?.innerText());
        const name = await child.$("div").then((e) => e?.innerText());
        activeSkills.push({
          level,
          name,
        });
      }

      const workSustainability = [];

      const workSustainabilitySections = await page.$$(
        "#mw-content-text > div.mw-parser-output > aside > section:nth-child(6) > section > div"
      );

      for (const section of workSustainabilitySections) {
        const name = await section.$("h3").then((e) => e?.innerText());
        const level = await section.$("div").then((e) => e?.innerText());
        workSustainability.push({
          name,
          level,
        });
      }

      const possibleDrops = [];

      const possibleDropsSections = await page.$$(
        "#mw-content-text > div.mw-parser-output > aside > section:nth-child(7) > div"
      );

      for (const section of possibleDropsSections) {
        possibleDrops.push(await section.innerText());
      }
      pals[i] = {
        ...pal,
        lore,
        title,
        number,
        partnerSkill,
        activeSkills,
        workSustainability,
        possibleDrops,
        food: await page
          .$(
            "#mw-content-text > div.mw-parser-output > aside > section:nth-child(6) > div > div"
          )
          .then((e) => e?.innerText()),
        type_1: await page
          .$(
            "#mw-content-text > div.mw-parser-output > aside > section:nth-child(3) > div:nth-child(3) > div > span > a:nth-child(2)"
          )
          .then((e) => e?.innerText()),
        type_2:
          (await page
            .$(
              "#mw-content-text > div.mw-parser-output > aside > section:nth-child(3) > div:nth-child(3) > div > p > span > a:nth-child(2)"
            )
            .then((e) => e?.innerText())) || null,
      };
    } else {
      const activeSkills = [];
      const section = await page.$$(
        "#mw-content-text > div.mw-parser-output > aside > section:nth-child(4) > div"
      );

      for (const child of section) {
        const level = await child.$("h3").then((e) => e?.innerText());
        const name = await child.$("div").then((e) => e?.innerText());
        activeSkills.push({
          level,
          name,
        });
      }

      const workSustainability = [];

      const workSustainabilitySections = await page.$$(
        "#mw-content-text > div.mw-parser-output > aside > section:nth-child(5) > section > div"
      );
      for (const section of workSustainabilitySections) {
        const name = await section.$("h3").then((e) => e?.innerText());
        const level = await section.$("div").then((e) => e?.innerText());
        workSustainability.push({
          name,
          level,
        });
      }

      const possibleDrops = [];

      const possibleDropsSections = await page.$$(
        "#mw-content-text > div.mw-parser-output > aside > section:nth-child(6) > div"
      );
      for (const section of possibleDropsSections) {
        possibleDrops.push(await section.innerText());
      }
      pals[i] = {
        ...pal,
        lore: await page
          .$("#mw-customcollapsible-paldeck > i")
          .then((e) => e?.innerText()),
        title: await page
          .$("#mw-content-text > div.mw-parser-output > aside > h2 > div > i")
          .then((e) => e?.innerText()),
        number: await page
          .$(
            "#mw-content-text > div.mw-parser-output > aside > section:nth-child(2) > div:nth-child(2) > div"
          )
          .then((e) => e?.innerText()),
        partnerSkill: {
          name: await page
            .$(
              "#mw-content-text > div.mw-parser-output > aside > section:nth-child(3) > div:nth-child(2) > div > b"
            )
            .then((e) => e?.innerText()),
          description: await page
            .$(
              "#mw-content-text > div.mw-parser-output > aside > section:nth-child(3) > div:nth-child(3) > div"
            )
            .then((e) => e?.innerText()),
        },
        activeSkills: activeSkills,
        workSustainability: workSustainability,
        possibleDrops: possibleDrops,
        food: await page
          .$(
            "#mw-content-text > div.mw-parser-output > aside > section:nth-child(5) > div > div"
          )
          .then((e) => e?.innerText()),
        type_1: await page
          .$(
            "#mw-content-text > div.mw-parser-output > aside > section:nth-child(2) > div:nth-child(3) > div > span > a:nth-child(2)"
          )
          .then((e) => e?.innerText()),
        type_2:
          (await page
            .$(
              "#mw-content-text > div.mw-parser-output > aside > section:nth-child(2) > div:nth-child(3) > div > p > span > a:nth-child(2)"
            )
            .then((e) => e?.innerText())) || null,
      };
    }
  }
  await fs.writeFile(path.join("./pals.json"), JSON.stringify(pals, null, 2));
}

async function getImages(page: Page) {
  //$$("td:nth-child(1)").filter(e=>e.querySelector('img')).map(e=>({name: e.querySelector('a')?.title || e.querySelector('b').textContent.split("-")[1].replace(' \t','').trim(), image: e.querySelector('img').src}))

  const images = require("../images.json");

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    //fetch image.image  using fetch api
    await downloadImage(image.image, `./public/images/pals/${image.name}.png`);
  }
}
async function downloadImage(src, path) {
  const response = await fetch(src);

  if (!response.ok) {
    throw new Error(`Failed to fetch image. Status: ${response.status}`);
  }

  const arr = await response.arrayBuffer();

  // Create a buffer from the array
  const buffer = Buffer.from(arr);

  // Save the image to the local file system
  await fs.writeFile(path, buffer);
}

async function downloadTypes() {
  const types = [
    "https://palworld.wiki.gg/images/3/33/Dark_icon.png",
    "https://palworld.wiki.gg/images/9/91/Dragon_icon.png",
    "https://palworld.wiki.gg/images/a/af/Electric_icon.png",
    "https://palworld.wiki.gg/images/5/5e/Fire_icon.png",
    "https://palworld.wiki.gg/images/c/cb/Grass_icon.png",
    "https://palworld.wiki.gg/images/5/58/Ground_icon.png",
    "https://palworld.wiki.gg/images/8/83/Ice_icon.png",
    "https://palworld.wiki.gg/images/1/14/Neutral_icon.png",
    "https://palworld.wiki.gg/images/7/7f/Water_icon.png",
  ];

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    const fileName = type.split("/").pop()?.replace("_icon", "");
    //fetch image.image  using fetch api
    await downloadImage(type, `./public/images/types/${fileName}`);
  }
}
