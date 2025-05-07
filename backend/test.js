import { compareArticles } from "./config/huggingFaceAPI.js";

let article1 = `In a significant blow to the government's clean energy ambitions the Danish energy company Orsted has cancelled plans for a huge windfarm off the coast of East Yorkshire.

The Hornsea 4 project would have become one of the biggest offshore wind farms in the world with a potential capacity of 2.4GW – enough to power more than a million homes.

Orsted said the project no longer made economic sense, despite signing a 15-year contract with the UK government guaranteeing to sell power at an agreed price.

The UK's offshore wind sector has faced soaring costs in recent years, as the government has acknowledged.

A spokesperson for the Department of Energy Security and Net Zero (DESNZ) said it recognised "the effect that globally high inflation and supply chain constraints are having on industry across Europe."

But this is the second developer to pull out of a major offshore project.

The Swedish company Vattenfall halted development of a 1.4GW wind farm off the coast of Norfolk in July 2023, again due to rising costs.

Thay project was sold to the German energy company RWE, which has said it plans to see the project through.

However, the difficulties offshore developers are facing raise significant questions about the viability of the government's clean power by 2030 target – one of the Labour government's five central "missions".

Just over half of the country's power currently comes from wind, solar, nuclear and biomass – organic matter. The government wants to raise that to 95% by 2030 – so in just five years' time.

In order to meet that target the UK will need to triple offshore wind capacity and double the amount of solar and onshore wind power on the system, according to estimates by Aurora Energy.

It will also need a significant upgrade to the electricity grid with 620 miles of new power lines as well as substations and other equipment.

    Green energy plan needs 600 miles of power lines - report
        Published
        5 November 2024

    Battle lines drawn over 'monstrous' pylons and solar farm 'wastelands'
        Published
        3 February

Many local communities are pushing back at the prospect of major new energy infrastructure near their homes.

Some industry experts - as well as the Conservative and Reform parties – say the 2030 target is not achievable.

Dieter Helm, professor of economic policy at the University of Oxford, has long argued building out this infrastructure in the timescale would be near impossible.

"In failing to meet a very short-term target, it is going to maximise the costs of trying," he has warned.

Chris Stark, the head of the government's Clean Power 2030 mission, has conceded the target will be – as he put it - "bloody hard", but that with a "Herculean effort" it can be met., external

Energy Secretary, Ed Miliband, accepts the plan it is ambitious and controversial but is adamant that it is essential to: "cut bills, tackle the climate crisis and give us energy security."

The government has said it plans to work with Orsted to get Hornsea 4 "back on track" and said it believed the clean power mission was still achievable.

"We have a strong pipeline of projects to deliver clean power by 2030 and our mission-led approach ensures we can steer our way through global pressures and individual commercial decisions to reach our targets," a spokesperson said.
Thin, green banner promoting the Future Earth newsletter with text saying, “The world’s biggest climate news in your inbox every week”. There is also a graphic of an iceberg overlaid with a green circular pattern.

Sign up for our Future Earth newsletter to keep up with the latest climate and environment stories with the BBC's Justin Rowlatt. Outside the UK? Sign up to our international newsletter here.
`;

let article2 = `

LONDON — Developers have pulled the plug on one of the U.K.’s biggest offshore wind projects, in a blow to the government’s clean power 2030 ambitions.

Danish renewables firm Ørsted said its decision to “discontinue” the 2.4 gigawatt Hornsea 4 wind farm “in its current form” was a result of rising supply chain costs and higher interest rates.

The project secured government guarantees under the flagship contracts for difference scheme only eight months ago and had been due to start operating by the end of 2030.

The firm said it will will “evaluate options for future development of the Hornsea 4 project given the continuing seabed rights, grid connection agreement and development consent order,” but confirmed it could no longer deliver the project as planned.

Increased offshore wind capacity is expected to form the backbone of Prime Minister Keir Starmer’s ambitious plan to power the U.K. almost entirely with low carbon sources by 2030. The potential loss of 2.4GW of potential capacity is a significant setback.

A spokesperson for the Department of Energy Security and Net Zero said the government would “work with Ørsted to get Hornsea 4 back on track” and insisted that there was still “a strong pipeline of projects to deliver clean power by 2030.”

The next round of subsidy allocations under the contracts for difference scheme — known as allocation round seven (AR7) — is due later this year and is seen as a final chance  to secure sufficient offshore wind capacity to hit the government’s 2030 goal.

An energy industry figure, granted anonymity to speak about government decision-making, said the loss of Hornsea 4 “raises the stakes quite a bit for AR7.”

The 2030 goal was still achievable, they said, “but it's obviously a significant amount of capacity that now will have to be sought elsewhere if the project can't get back up and running.”
`

const test = await compareArticles(article1, article2);

console.log(test)