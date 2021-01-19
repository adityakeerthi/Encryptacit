## How to Use Our Deployed Prototype
1. Please install Metamask through the chrome web store here: https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn
2. Follow the Metamask instructions to create your own wallet ID
3. Please switch your network from the main etherium network to the Rinkeby Test Network
4. Give yourself some ETH through the Rinkeby Ethereum Test Faucet
5. Open up our website at https://htn2021-27e30.web.app/, and when prompted, log into your metamask wallet account
6. You are now free to explore!

Note: If you would like to try out some of the advanced features of our app, you may need to create multiple Metamask accounts.


## Quick Information 
You can try out our **fully functional** app at: https://htn2021-27e30.web.app/, if you are new to blockckchain, our repo contains a readme which explains a little about how you can get started with using our app.

## Inspiration

###Extended video transcript, which covers our inspirations and motivations:

 In March of last year, ProPublica reported that upon investigating president Trump’s financial documents, they found significant discrepancies between figures that were given to lenders and the New York City tax authorities. Some city employees have even publicly stated that they took personal bribes from Trump himself to lower the valuations of his properties. Now, although we must concede that this is merely speculation, there are some strong pieces of evidence behind these claims, and we can’t help but wonder whether or not they are true. Unfortunately, this is a natural problem that exists within a free market economy, and it is called appraisal or valuation fraud. This type of scheme is particularly difficult to detect, since the parties conducting appraisals or valuations of any asset such as properties, cars, valuables, can deceive alongside the owner for a percentage of the profits gained. And if the case of a man who has been under the scrutinizing eye of thousands of financial auditors for five and a half years since the beginning of his campaign, is unsolvable, it poses the question of how many times does it go unnoticed in other cases? Just how frequent of a scam is this? These questions lack an answer because there is a lack of verification and trust, which points to the need for a system where multiple parties of auditors and evaluators can legitimately perform appraisals on any given asset and are incentivized for their accuracy to promote transparency. This is why our team came up with []. [] is a decentralized web application that allows users to list any assets they want to be evaluated. This listing will generate a ticket, where up to five independent parties are chosen as the evaluators. Before these evaluators can be assigned to a ticket, they have to deposit a sum of money onto their accounts as a buy-in, known as a stake. Depending on the consensus and accuracy of the price listings given by the evaluators, they will be rewarded or penalized accordingly. If their evaluation is considerably accurate (roughly a 5% percent spread), then they will be returned their stake, plus a percentage of the commission fee that the users have to pay to list their assets. Accurate predictions will also improve an evaluator’s reputation score on our website. If an evaluator is not accurate with their prediction, then they will lose their reputation score. If they fall below a minimum threshold of reputation score, they will forfeit their buy-in amount and will have to rebuy-in in order to keep evaluating.  This system allows for pure transparency, as the anonymity and price rewards gamify the process for evaluators to aspire to be competent, and therefore, transparent with their predictions. 

## What it does
Encryptacit implements an incentivization protocol to help peers verify the valuations of any type of asset. In layman's terms, what this means is that we have a method in place to allow for multiple valuations of an asset to be completed, and compared against each other to check for accuracy and legitimacy. 

#### How does our incentive protocol work?
We have implemented a gamified system to reduce the amount of lying that happens during the game. Firstly, all the evaluators, auditors, and appraisers must provide a stake into the "game" of $100 (paid in ether for convenience). At this point, each newly staked participant is assigned a hidden reputation value. As they participate in the system, there are multiple scenarios regarding outcomes in the "game". 

A) In the event that a consensus is reached regarding the valuation of an asset provided in a ticket, **payouts** are given to all the people who tell the truth, which in this case, are the people who **agreed** with the consensus. (I.e, 3 people voted for Truth, all 3 of these people get a small payout, equivalent to 5% commission divided among them). This idea can extend to any number of people who have reached a consensus. The auditors who told the truth receive a boost in their internal reputation score.

B) As most consensuses are reached, there are a few "liers" in the system. These are people who vote against the consensus. They **do not** gain a payout, and their internal reputation is reduced. This is a punishment, but it is not too hard on non-repeat offenders.

###Why do we use reputation?
Reputation is used to keep in check the truth of the participants. Because the entire industry relies on honesty, we need a system in place to quantify the probability of someone purposefully acting badly. **If a participant's internal rep hits 0, they lose their entire stake and they are kicked out of the game. They must retake (pay more money) to come back in.**

As you can imagine, this whole system is designed to ensure that the highest level of honesty is achieved. Some other important notes are that the auditors are selected **at random** (to a certain degree), and they do now know who the other auditors are until the case is closed, and they cannot tell what the other auditors voted. The reason we do this is to combat collaboration and gamification of the system. Lastly, we use a threshold of a 5% spread to determine whether the original value proposed by the ticket creator is reasonable. I.e if someone has a car for $10 000, a guess of $11000 by an auditor would be considered a "false" value, as it is 10%, but a guess of $10010 would be within the 5% spread, thus counting as a vote for "truth".

Users can walk away with a cryptographic "receipt" which confirms the ticket consensous, and can be used as official proof for the valuation of assets in any context.

## How we built it

We used the ethereum ecosystem to implement the cryptographic and blockchain logic. Using smart contracts, we were able to automate the money functions and distributions in a seamless and trustless method. We used the smart contract to publish results and create cryptographic, immutable, transparent, and safe receipts for the ticket creators. The data is published on the blockchain, and we used ethers.js to read the data off the blockchain directly, to prove the legitimacy of evaluations (see demo or website).

We used firebase for some of the user data and cross-references, but all the trust-related data (receipts and results) are published on-chain for security- not in our centralized DB. 

We used Ganache, truffle, and remix for testing of blockchain tech, and we used express as our backend, and react for the front end. We used AWS + serverless framework to deploy our backend.

## Challenges I ran into

One of the challenges was that there was so many features and complicated piece of infrastructure involved with creating this project, that it was extremely difficult to fit it in the 36 hours.

## Accomplishments that I'm proud of
I think that my group can testify, with all our hackathon experiences, we were very proud to get a completely functional deployed MVP in the weekend time, and that it includes all the initial pieces of functionality that we initially designed it to have.

## What I learned
One thing we learned, since it's been a while since our last hackathon, that technology, specifically in the crypto space, advanced really fast, and a lot of the code and methods that we used before does not work anymore, thus we had to pivot slightly to adjust.

## What's next for Encryptacit
I think we want to play around with our deployed app and see what we can do with it, and encourage people to give it a try, even it's for fun!

### Developed by Aditya, Arnav, Daniel, Markos
### Devpost can be found [here](https://devpost.com/software/encryptacit)
