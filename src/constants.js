export const votingPhaseDetails = {
  heading: "Voting on Solutions is live",
  description:
    "Stake your favorite MATIC tokens and vote on winning solutions to earn attractive incentives.",
  buttonLabel: "Vote Now",
};

export const solvingPhaseDetails = {
  heading: "Solving on Questions is live",
  description:
    "Fire up your development skills by building open source dapps and earn bounty rewards.",
  buttonLabel: "Solve Now",
};

export const completed = {
  heading: "Completed",
  description: "It is completed",
};

export const categoriesFields = ["Front End", "Back End", "Smart Contract"];

export const approvalTypes = [
  "I will approve the solution",
  "The community will approve the solution",
];

export const options = {
  issueUrlOptions: [
    {
      value: "githubIssueUrl",
      label: "Github Issue Url",
      placeholder: "Enter Github issue Link",
    },
    {
      value: "otherUrl",
      label: "Other Url",
      placeholder: "Enter other link",
    },
  ],
};
export const drawerList = [
  "Edit your profile",
  "Bounties Posted",
  "Bounties Solved",
  "Voting",
];

export const text = {
  page1: {
    title: `What should we call your Bounty?`,
    content: `The title is the first thing that a builder sees when he/she comes across your bounty. It’s best practise to keep the title closely related to the issue. Avoid vague words like Important, amazing, stunning etc.`,
  },
  page2: {
    title: `Which tools/softwares
    are required?`,
    content: `Tag the names of the softwares/tools that needs to be used to solve the bounty. Example- ReactJS, Photoshop, MongoDB, Figma, etc. 
    Type in the name of the tool/software and press Enter to add it as a tag.`,
  },
  page3: {
    title: `List the evaluation criterias`,
    content: `The evaluation criteria field is for highlighting the main focus points of your bounty. Minimum code execution time, gradient based UI design, etc. Whatever be the priorities of your bounty, list them down here for the builders to understand.`,
  },
  page4: {
    title: `Expected time of the solution`,
    content: `Use this section to highlight the number of days within which you are expecting the bounty to be completed. Remember, shorter the expected time, higher should be the bounty amount. `,
  },
  page5: {
    title: `Provide the link to a resource for your Bounty`,
    content: `This helps the contributor understand your bounty better. Use this field to redirect to a Github issue, a document, a video, a website, etc. Please note that the link entered here cannot be changed/edited once the bounty is posted.`,
  },
  page6: {
    title: "Enter the bounty description",
    content:
      "Use this area to describe to the builders any details regarding the bounty. Chances of getting a good solution to your bounties increase 10x times if the description has been filled out.",
  },
  page7: {
    title: `Provide the bounty amount`,
    content: `Mention the amount that the developer
      shall receive after completing the bounty. Note: This amount will be held in an escrow contract and will be transferred to the developer once you confirm that you’ve received the code.`,
  },
  page8: {
    title: `Solution Voting`,
    content: `Turn it on if you want the solutions to Be reviewed and voted on by the community members. Turn it off if you don’t want the community to vote on your solutions.`,
  },
  page10: {
    title: `Enter Community Reward`,
    content: `Community voting makes your life a lot easier in selecting the best solution to your bounty. They do the voting.You choose the best solution based on the votes. Simple and Fast. The reward goes out to the voters who voted for the highest voted solutions. `,
  },
  page11: {
    title: `Confirm your Wallet Address`,
    content: `Provide the wallet address which you will be using for transfering the bounty reward to the escrow. All transactions, regarding the bounty shall be associated with this address. `,
  },
  page9: {
    title: `Expected time of the vote`,
    content: `Use this section to highlight the number of days within which you are expecting the voting to be completed. Remember, shorter the expected time, higher should be the community amount.  `,
  },
};

export const categoryText = [
  {
    title: "Front End",
    content:
      "Front-end web development is the development of the graphical user interface of a website, through the use of HTML, CSS, and JavaScript, so that users can view and interact with that website.",
  },
  {
    title: "Back End",
    content:
      "Backend is the server-side of the website. It stores and arranges data, and also makes sure everything on the client-side of the website works fine. Its basically behind the scenes.",
  },
  {
    title: "Smart Contract",
    content:
      "A smart contract is a self-executing contract with the terms of the agreement between buyer and seller being directly written into lines of code. The code exists on the blockchain network.",
  },
  {
    title: "Others",
    content:
      "This is an open category that can correspond to a vast number of options like documentation, design, architecture or any other categories that we missed out on.",
  },
];

export const communityText = [
  {
    title: "Turn on voting",
    content:
      "The community stakes and votes on the submitted solutions to your bounty and helps you figure out the best solution.You get to your desired solution 5x faster. The community earns incentives. Win-win.",
  },
  {
    title: "Turn off voting",
    content:
      "If you are willing to spend hours reviewing pieces of code to figure out the best solution to your bounty, this one is  for you. Pros: You are superhuman. Cons: You don’t leverage the power of community. Win-Lose.   ",
  },
];

export const sidebarItems = [
  {
    name: "Post a bounty",
    url: "/bounty",
  },
  {
    name: "Solve Bounties",
    url: "/bounties",
  },
  {
    name: "Vote on Solutions",
    url: "/bounties",
  },
  {
    name: "Your Profile",
    url: "/profile",
  },
];

export const twitterMessage = `Hey Builders! I just contributed to this cool bounty @chainwhiz. Absolutely would recommend everyone to check out app.chainwhiz.app for awesome bounties!!
#CWGOATS`;
