from rouge_score import rouge_scorer
import numpy as np
from tabulate import tabulate
from sklearn.metrics import precision_recall_fscore_support, confusion_matrix
import numpy as np

# Define sources and summaries
data = [
    {
        "source": '''The root cause of a fire which led to the shutdown of Heathrow Airport and affected hundreds of thousands of journeys worldwide "remains unknown", an interim report says.

Heathrow was closed to all flights for much of 21 March after a fire at a nearby electrical substation, which started the previous night, caused a power outage at the airport.

In Thursday's report, the National Energy System Operator (Neso) said a transformer disconnected and caught fire at the substation in Hayes, west London.

The grid operator's final report is due by the end of June. Heathrow Airport said it welcomed the interim findings and that it hoped the final report would provide answers on what caused the fire.

The Metropolitan Police's counter-terrorism unit carried out an initial investigation into the fire, but Neso noted that detectives found there "no evidence to suggest" the incident was suspicious.

The power outage and subsequent closure of Heathrow led to more than 270,000 journeys being affected.

Energy Secretary Ed Miliband shortly after ordered an urgent investigation into the fire to prevent it "from ever happening again", and told Neso to provide its initial findings within six weeks.

Heathrow's management has been criticised for the decision to close the airport and the long shutdown that followed.

Neso said power was restored to Heathrow's terminals seven hours before flights resumed.
Two people outside Terminal 4 at London Heathrow Airport in London, on Friday 21 March London's with trolleys full of luggage. One person is looking at her phone while the other is sitting down. Heathrow airport suffered its worst disruption in at least two decades, after a nearby fire cut power to the hub and brought travel to a standstill for hundreds of thousands of passengers. Image source, Getty Images
Image caption,

The outage disrupted more than 270,000 journeys

In a detailed timeline, it said the fire at the North Hyde substation, which was built in the 1960s, started at 23:21 GMT on 20 March and resulted in a "simultaneous loss of connection".

The power outage affected 66,919 domestic and commercial customers, including Heathrow Airport, Neso said.

A major incident was declared by the Met Police at 00:42, and Heathrow took the decision to close the airport at 01:11 the following morning.

Neso's chief executive Fintan Slye said: "It is important that the right lessons are learnt from this incident to prevent future instances where possible and to manage them effectively when they do occur."
Birdseye view of map showing the location of Heathrow airport and North Hyde electricity substation.

Power was restored to Heathrow's substations by 06:25 using circuits from another nearby substation, Neso said, and the flow of electricity to all four of Heathrow's passenger terminals was restarted by 10:56.

But Flights did not resume until after 18:00 that day, once safety checks were completed. Planes were able to land and take off through the night to allow Heathrow to get back up to full capacity.

Neso said the re-energisation of the entire airport was only fully completed by 14:23.

Other customers' power was restored by 12:24, the report said, and supply from the North Hyde substation was reinstated the following day.

Heathrow relies on three electricity substations, and has emergency back-up power supplies, such as diesel generators and batteries - but these only keep crucial safety systems running, such as landing equipment and runway lights.

Heathrow's chief executive Thomas Woldbye previously said the shutdown was caused not by a lack of power but by the time it took to switch from the damaged substation's supply to the other operational substations.

Due to Heathrow's "size and operational complexity", managers decided to close the airport on safety grounds while this took place.

The airport said at the time that its objective "was to reopen as soon as safely and practically possible after the fire".

Neso confirmed that the restoration of power to the airport was followed by "a period of safety checking" to ensure "safety critical systems were fully operational prior to passengers arriving at the airport".

Heathrow said in a statement: "Further clarity on how the fire started and why two transformers were subsequently impacted can help ensure greater resilience for the UK's energy grid moving forward."

    How did a single fire bring down Europe's busiest airport?

Smoke billows from the North Hyde Electricity Substation in HayeImage source, EPA
Image caption,

London Fire Brigade said the fire was under control by 06:30 on 21 March

Both the National Grid, which owns the North Hyde substation, and energy firm SSEN, which is responsible for power distribution in the area, said they welcomed the interim findings and would await Neso's full report.

London Fire Brigade (LFB), which sent 70 firefighters, previously said that the substation blaze "involved a transformer containing insulating oil which was fully alight".

"This created a significant hazard due to being within a substation containing high-voltage equipment and the challenges of an oil-fuelled fire," it said in a statement.

LFB explained crews had to wait for the transformer to cool down "before cutting through the steel casing to reach and extinguish pockets of fire that were inaccessible".

Following the publication of the interim report, Miliband said: "We now await the full report to understand what happened and learn lessons to strengthen UK energy resilience and protect our critical national infrastructure.''',
        "summary": 'root cause of fire which led to Heathrow Airport shutdown "remains unknown" Heathrow was closed to all flights for much of 21 March after a fire at a nearby electrical substation. Power outage affected 66,919 domestic and commercial customers, including Heathrow. More than 270,000 journeys were affected. London Fire Brigade (LFB), which sent 70 firefighters, previously said that the substation blaze "involved a transformer containing insulating oil which was fully alight" LFB explained crews had to wait for the transformer to cool down "before cutting through the steel casing to reach and extinguish pockets of fire'
    },
    {
        "source": '''"The U.S. Supreme Court on Monday allowed the Trump administration to use an 18th century wartime law to deport Venezuelan migrants, but said they must get a court hearing before they are taken from the United States.

In a bitterly divided decision, the court said the administration must give Venezuelans who it claims are gang members "reasonable time" to go to court.

But the conservative majority said the legal challenges must take place in Texas, instead of a Washington courtroom.

The court's action appears to bar the administration from immediately resuming the flights that last month carried hundreds of migrants to a notorious prison in El Salvador. The flights came soon after U.S. President Donald Trump invoked the Alien Enemies Act (AEA) for the first time since the Second World War to justify the deportations under a presidential proclamation calling the Tren de Aragua gang an invading force.

The majority said nothing about those flights, which took off without providing the hearing the justices now say is necessary.

In dissent, the three liberal justices said the administration has sought to avoid judicial review in this case and the court "now rewards the government for its behaviour." Justice Amy Coney Barrett joined portions of the dissent.

    U.S. government ordered to bring back Maryland resident after 'wholly lawless' deportation

    Trump administration accused of defying court orders in separate deportation cases

Justice Sonia Sotomayor said it would be harder for people to challenge deportations individually, wherever they are being held, and noted that the administration has also said in another case before the court that it's unable to return people who have been deported to the El Salvador prison by mistake.

"We, as a Nation and a court of law, should be better than this," she wrote.

The justices acted on the administration's emergency appeal after the federal appeals court in Washington left in place an order temporarily prohibiting deportations of the migrants accused of being gang members under the rarely used AEA.

"For all the rhetoric of the dissents," the court wrote in an unsigned opinion, the high court order confirms "that the detainees subject to removal orders under the AEA are entitled to notice and an opportunity to challenge their removal."
Escalating tension

The case has become a flashpoint amid escalating tension between the White House and the federal courts. It's the second time in less than a week that a majority of conservative justices has handed Trump at least a partial victory in an emergency appeal after lower courts had blocked parts of his agenda.

Several other cases are pending, including over Trump's plan to deny citizenship to U.S.-born children of parents who are in the country illegally.
WATCH l Explaining the debate over the use of Alien Enemies Act:

How can Trump use a wartime law to deport people when there's no war? | About That
2 months ago
Duration 11:56
The Trump administration deported more than 200 immigrants by invoking the Alien Enemies Act — a wartime measure — alleging they were members of Tren de Aragua, a Venezuelan gang. Andrew Chang explains how Trump is interpreting the language of the 1798 law in order to avoid the standard immigration court system, and why experts say it's a slippery slope.

Trump praised the court for its action Monday.

"The Supreme Court has upheld the Rule of Law in our Nation by allowing a President, whoever that may be, to be able to secure our Borders, and protect our families and our Country, itself. A GREAT DAY FOR JUSTICE IN AMERICA!" he wrote on his Truth Social site.

    European visitors to U.S. surprised by denial of entry, dayslong detentions

    Migrants expelled from U.S. to Costa Rica, Panama in a legal 'black hole'

Attorneys from the American Civil Liberties Union (ACLU) filed the lawsuit on behalf of five Venezuelan noncitizens who were being held in Texas, hours after the proclamation was made public and as immigration authorities were shepherding hundreds of migrants to waiting airplanes.

ACLU attorney Lee Gelernt said the "critical point" of the high court's ruling was that people must be allowed due process to challenge their removal. "That is an important victory," he said.

Boasberg imposed a temporary halt on deportations and also ordered planeloads of Venezuelan immigrants to return to the U.S. That did not happen. The judge held a hearing last week over whether the government defied his order to turn the planes around. The administration has invoked a "state secrets privilege " and refused to give Boasberg any additional information about the deportations.

Trump and his allies have called for impeaching Boasberg. In a rare statement, Chief Justice John Roberts said "impeachment is not an appropriate response to disagreement concerning a judicial decision."",''',
        "summary": '''The Supreme Court says the administration must give Venezuelans "reasonable time" to go to court. But the conservative majority said the legal challenges must take place in Texas, instead of a Washington courtroom. The court's action appears to bar the administration from immediately resuming the flights.'''
    },
    {
        "source": '''Aracely Serrano arrived on Monday, shortly after 8:30 a.m., in the parking lot next to the U.S. port of entry in Niagara Falls, N.Y., where she had recently been detained along with her common-law husband and two daughters in a windowless holding cell for two weeks.

She pulled a light blue suitcase and a black backpack from the trunk of a vehicle that ferried Serrano and her two daughters, Madelin, 14, and Itzayana, 4, from a shelter in Buffalo, N.Y., to the parking lot.  

The trio walked past the stone walls of the U.S. port of entry, beneath the bulbous eyes of the surveillance cameras and through the metal turnstiles below the sign that read, "Entry to Canada."

"I have hope that this time, yes, it will happen," she said, her daughters by her side. 

Serrano felt this same hope the last time she took this pedestrian walkway across the Rainbow Bridge that spans the Niagara River to Canada. It was March 17, as previously reported by CBC News, and she was crossing with her husband Marcos Guardado and the two girls. 

Originally from El Salvador, they had been living undocumented in New Jersey and decided to take the risk of exposure and make an asylum claim in Canada, to escape the Trump administration's immigration crackdown that had injected fear into their everyday lives. 
A man with a black baseball cap wtih a Blue Jays baseball team logo.
Israel Serrano, brother to Aracely, worked to get the family into Canada while they were detained in the U.S. (Ousama Farag/CBC)

But Canadian border officials on the other side questioned the veracity of documents Serrano presented that she said proved she had an anchor relative — a brother who is a Canadian citizen — one of the exceptions that allow asylum claims under the Safe Third Country Agreement between Canada and the U.S. 

The Canada Border Services Agency (CBSA) sent the family back to the U.S. where they were held for two weeks inside cells designated for detentions lasting under 72 hours. 

The family managed to breathe fresh air once during their detention, in late March, when they were sent across the bridge to the Canadian port of entry only to be rejected again. They were sent back to the U.S. and into a windowless cell where Itzayana would sometimes wake up crying from bad dreams. 
Brother looks for help

While they were detained, Serrano's brother, Israel Serrano, began making calls, including to the Canada-U.S. Border Rights Clinic, which provides free legal advice to migrants. This is how they found Heather Neufeld, an experienced Ottawa-based immigration lawyer. 

Neufeld filed a challenge in the Federal Court of Canada to overturn the CBSA's rejection of their attempt to file an asylum claim. 

Then, last week, Immigration, Refugees and Citizenship Canada agreed to allow Serrano to enter Canada and make the claim. 
A man stands on sidewalk looking to the left while leaning on a short concrete post.
Miguel Serrano, Aracely's other brother, waits as evening falls in Niagara Falls, while his sister and nieces are processed by officials with the Canada Border Services Agency. (Ousama Farag/CBC)

"I think finally the government has recognized that they did the wrong thing, that they made mistakes," said Neufeld, who accompanied Serrano on this, her third walk across the bridge to Canada. 

"Our lives are about to change, forever, for my daughters," said Serrano, as she approached the lines on the bridge marking the international border which runs through the river below. 

"We don't have to live with this fear anymore."

But there was still a risk she could be turned away.

After Serrano arrived at the Canadian port of entry, she faced renewed questioning from the CBSA as her case was scrutinized again. Neufeld says she began to worry as the process dragged on. 

"There has been a lot of questioning, a lot of investigation," said Neufeld, in a telephone interview with CBC News from inside the Canadian customs building.
A woman hugs a man with a baseball cap. A woman stands in the background looking at them. They are at the Canadian port of entry in Niagara Falls, Ontario.
Aracely hugs Isarael shortly after she was released into Canada while her lawyer, Heather Neufeld, looks on in the background. (Ousama Farag/CBC)

At about 3 p.m. ET, roughly six hours after Serrano first entered the customs office, she received word that she could stay with her daughters in Canada and make her asylum claim. 

"I feel extremely relieved, it was super, super stressful not knowing what was going to happen," said Neufeld. 

Outside, against the backdrop of Niagara Falls, the towering plume of spray rolling across the horizon, her brothers Israel and Miguel Serrano, celebrated. 

"We hugged each other, we jumped into each other's arms," said Israel. 

"After all that happened, thanks to God, they're about to be with us," said Miguel.

It would take six more hours for paperwork and delays before Serrano, Madelin and Itzayana emerged through the doors of the customs building, under a cool Niagara Falls, Ont., night and into the arms of her waiting brothers. 
A family of four. The father, on the left, with a young girl between him and the mother, in the centre, and a teenage girl on the right. They are on a bridge in front of Niagara Falls.
Marcos Guardado, Itzayana, Aracely and Madelin, left to right, pose on the Rainbow Bridge on March 17 shortly before they were turned away by Canadian officials and jailed together in the U.S. He is still in detention. (Courtesy of the Serrano family)

There were hugs and video calls with family members. It was now after 9 p.m. The coloured lights from marquees and buildings tinted the spray from the falls. 

"When they opened the doors and said 'Welcome to Canada and good luck with your new life' — I felt an immense joy, it's indescribable, " Serrano said. 

"My daughters gave me so much strength."

Strength that was also flowing to her husband, she said. 

While U.S. immigration authorities had released Serrano and her daughters on April 1 — requiring them to check in every week — Guardado was sent to an immigration detention centre in Batavia, N.Y. He faces a deportation hearing in June. 

    Family of 4 jailed in U.S. for weeks after Canadian border guards turned them away

    Quebec border sees asylum claims double between March and April

    Search is over for woman, 2 young children near Quebec-U.S. border

Neufeld says they will now work to bring him into Canada, so he can enter the asylum process with his family. 

"We're trying to figure out a possibility of getting him out on bond, which would allow him to come," she said. ''',
        "summary": "Aracely Serrano and her two daughters, Madelin, 14, and Itzayana, 4, had been living undocumented in New Jersey. They decided to make an asylum claim in Canada, to escape the Trump administration's immigration crackdown. Canadian border officials on the other side questioned the veracity of documents Serrano presented. U.S. immigration authorities had released Serrano and her daughters on April 1. But Guardado was sent to an immigration detention centre in Batavia, N.Y. Neufeld says they will now work to bring him into Canada, so he can enter the asylum process."
    }
]

# Initialize scorer
scorer = rouge_scorer.RougeScorer(['rouge1', 'rougeL'], use_stemmer=True)

# Collect scores
table_data = []
rouge1_scores = []
rougeL_scores = []

for i, item in enumerate(data, start=1):
    scores = scorer.score(item['source'], item['summary'])
    rouge1 = scores['rouge1'].fmeasure
    rougeL = scores['rougeL'].fmeasure
    rouge1_scores.append(rouge1)
    rougeL_scores.append(rougeL)
    table_data.append([f"Example {i}", round(rouge1, 4), round(rougeL, 4)])

# Add average row
avg_rouge1 = np.mean(rouge1_scores)
avg_rougeL = np.mean(rougeL_scores)
table_data.append(["**Average**", round(avg_rouge1, 4), round(avg_rougeL, 4)])

# Print table
headers = ["Example", "ROUGE-1 (F1)", "ROUGE-L (F1)"]
print(tabulate(table_data, headers=headers, tablefmt="github"))
