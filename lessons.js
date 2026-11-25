"use strict";

const lessons = [
  {
    id: "explorer", title: "Data Explorer", icon: "chart", cue: "Start with a question",
    heading: "What does a typical day look like?",
    intro: "The school garden club counted butterflies over five days. Can one number tell the whole story?",
    hook: "A data set is a collection of observations. Start by asking what was measured and what each value represents.",
    idea: "Read the data before calculating",
    example: "The garden club recorded 4, 7, 4, 6 and 9 butterflies, one count for each day.",
    steps: [["What was counted?", "Butterflies"], ["How many records?", "5 days"], ["What does 4 mean?", "Four butterflies on a particular day"]],
    takeaway: "The number of records is 5. The number of butterflies is 30.",
    discuss: "If we record another day with 4 butterflies, what changes in the data set?",
    labTitle: "Garden field notes", labSub: "Select a day to read its observation.",
    location: "Butterfly watch",
    questions: [
      {
        title: "A week of butterfly watching",
        scene: "The garden club counted butterflies once a day. A few days had the same count.",
        evidence: {"label": "Butterflies per visit", "values": [3, 6, 3, 8, 10]},
        prompt: "How many days did they collect data?",
        answer: 5,
        hint: "Each entry represents one day, even when counts repeat.",
        solution: "There are five entries. The two 3s came from different days, so the club collected data on 5 days."
      },
      {
        title: "A busier flower bed",
        scene: "Sari returns to the same sunflower bed on Thursday to see if more butterflies are visiting.",
        evidence: {"label": "Butterflies at the sunflower bed", "values": [["Monday", 5], ["Thursday", 8]]},
        prompt: "How many more butterflies did she see on Thursday?",
        answer: 3,
        hint: "Compare the two counts using subtraction.",
        solution: "Thursday’s count was 8 and Monday’s was 5. The difference is 8 − 5 = 3 butterflies."
      },
      {
        title: "Which corner do butterflies visit?",
        scene: "Rafi wants to compare butterfly counts from the pond and the flower bed. His notebook lists only the dates and counts.",
        prompt: "What should Rafi add beside every count?",
        type: "choice",
        options: ["The spot where he counted", "The biggest count of the week", "The name of every club member"],
        answer: 0,
        hint: "He needs to know which observations belong to the pond and which belong to the flower bed.",
        solution: "Write the spot next to each count. Then Rafi can group the counts by spot and compare them."
      }
    ]
  },
  {
    id: "mode", title: "Mode", icon: "layers", cue: "Most frequent",
    heading: "Which value shows up most?",
    intro: "The mode helps when you want to know what happens most often, such as the most requested shirt size.",
    hook: "The mode is the value or category that occurs most often. Two values can tie for the highest frequency.",
    idea: "Count repeats",
    example: "The club ran a game. Here are five scores: 2, 3, 3, 4, 6.",
    steps: [["Count the 3s", "2 times"], ["Count each other score", "1 time"], ["Mode", "3"]],
    takeaway: "The mode is the score 3. Its frequency is 2.",
    discuss: "Could the mode be the smallest value in a data set? Give an example.",
    labTitle: "Frequency finder", labSub: "Switch data sets and see which columns are tallest.",
    location: "Badge booth",
    questions: [
      {
        title: "Pick a badge to restock",
        scene: "At the school fair, pupils choose a badge design by number. Mira has time to print extra copies of just one design.",
        evidence: {"label": "Design numbers requested", "values": [4, 6, 6, 8, 9]},
        prompt: "Which design number should Mira restock?",
        answer: 6,
        hint: "Look for the design number requested most often.",
        solution: "Design 6 was requested twice. The others were requested once each, so design 6 is the mode."
      },
      {
        title: "Two popular designs",
        scene: "The badge booth gets six more requests. Jo thinks there must be just one most popular design.",
        evidence: {"label": "New design requests", "values": [2, 2, 4, 5, 5, 8]},
        prompt: "What are the two modes? Enter the smaller one first.",
        fields: ["Smaller mode", "Larger mode"],
        answer: [2, 5],
        hint: "Two designs are tied at the highest frequency.",
        solution: "Designs 2 and 5 each appear twice. Both have the highest frequency, so this data set is bimodal."
      },
      {
        title: "The final request",
        scene: "Mira has five badge requests so far. One more pupil is about to choose a design.",
        evidence: {"label": "Requests so far", "values": [2, 2, 4, 4, 7]},
        prompt: "What design number would make design 4 the only mode?",
        answer: 4,
        hint: "Designs 2 and 4 are tied. Think about what a single new request can change.",
        solution: "A request for 4 gives design 4 three requests. Design 2 stays at two, so 4 is the only mode."
      }
    ]
  },
  {
    id: "median", title: "Median", icon: "spread", cue: "Middle of an ordered list",
    heading: "What sits in the middle?",
    intro: "Put the values in order. Find the centre by position, even if the values are unevenly spaced.",
    hook: "The median is the middle value in an ordered list. With two middle values, take their mean.",
    idea: "Sort first, then find the centre",
    example: "Five runners took 10, 4, 7, 3 and 6 minutes.",
    steps: [["Put them in order", "3, 4, 6, 7, 10"], ["Find the middle position", "3rd of 5"], ["Median", "6 minutes"]],
    takeaway: "For 4, 6, 8, 12 the median is (6 + 8) ÷ 2 = 7.",
    discuss: "Can a median be a number that never appears in the list?",
    labTitle: "The sorting bench", labSub: "Work through an odd list and an even list.",
    location: "Garden trail",
    questions: [
      {
        title: "Time the garden trail",
        scene: "Five pupils walk the same garden trail during break. Lin lists their times in the order they finished recording.",
        evidence: {"label": "Trail times in minutes", "values": [9, 3, 8, 1, 4]},
        prompt: "What is the median trail time in minutes?",
        answer: 4,
        hint: "Sort the five times and find the third one.",
        solution: "In order the times are 1, 3, 4, 8, 9. The middle time is 4 minutes."
      },
      {
        title: "Six turns at the planting table",
        scene: "Six teams each get one turn to plant a seedling. The timer records how long each team takes.",
        evidence: {"label": "Planting times in minutes", "values": [11, 4, 7, 9, 5, 2]},
        prompt: "What is the median planting time in minutes?",
        answer: 6,
        hint: "There are six times, so find the third and fourth after sorting.",
        solution: "The ordered times are 2, 4, 5, 7, 9, 11. The median is (5 + 7) ÷ 2 = 6 minutes."
      },
      {
        title: "The muddy notebook",
        scene: "A splash hides one number in Naya’s ordered list of trail times. The note on the next page says the median was 8 minutes.",
        evidence: {"label": "Trail times, already ordered", "values": [2, 5, "?", 9, 12, 15]},
        prompt: "What time belongs in the blank?",
        answer: 7,
        hint: "Together the two middle times add to twice the median.",
        solution: "The middle pair is the missing time and 9. They add to 2 × 8 = 16, so the missing time is 7 minutes."
      }
    ]
  },
  {
    id: "mean", title: "Mean", icon: "balance", cue: "Fair share",
    heading: "What if everyone got the same share?",
    intro: "Imagine sharing the total equally. Each equal share is the mean.",
    hook: "Mean = total of the values ÷ number of values. Repeated values count each time they appear.",
    idea: "Keep the total, level the piles",
    example: "Four tables brought 1, 3, 5 and 7 seeds.",
    steps: [["Add up the seeds", "1 + 3 + 5 + 7 = 16"], ["Count the tables", "4"], ["Share equally", "16 ÷ 4 = 4 per table"]],
    takeaway: "Total = mean × number of values. Use this when a value is missing.",
    discuss: "If the mean is 4, must at least one table have started with 4 seeds?",
    labTitle: "Share the seeds", labSub: "Tap a tray to pick a seed. Tap a different tray to move it.",
    location: "Seed station",
    questions: [
      {
        title: "Seeds for every table",
        scene: "Four tables bring seed packets to the club. Everyone pours their seeds into one tray and shares them equally among the four tables.",
        evidence: {"label": "Seeds brought by each table", "values": [3, 5, 8, 8]},
        prompt: "How many seeds should each table get?",
        answer: 6,
        hint: "Add all four counts and share the total equally.",
        solution: "The tables bring 3 + 5 + 8 + 8 = 24 seeds. Each table gets 24 ÷ 4 = 6 seeds."
      },
      {
        title: "The missing seed envelope",
        scene: "Five teams brought seeds to the fair. Their mean was 8 seeds per team, but one envelope has lost its label.",
        evidence: {"label": "Seeds in the four labelled envelopes", "values": [6, 8, 7, 9]},
        prompt: "How many seeds are in the unlabelled envelope?",
        answer: 10,
        hint: "Use the mean and the number of teams to recover all the seeds first.",
        solution: "Five teams at a mean of 8 brought 40 seeds in total. The labelled envelopes hold 30, so the fifth holds 10 seeds."
      },
      {
        title: "Two readers join",
        scene: "At the garden reading corner, three pupils have read a mean of 10 pages each. Two more pupils join the record with 12 and 18 pages.",
        prompt: "What is the mean number of pages for the five pupils together?",
        answer: 12,
        hint: "Work out the three pupils’ total first. Then add the pages read by the two new pupils.",
        solution: "The first three pupils read 30 pages. The five pupils read 30 + 12 + 18 = 60 pages, so the new mean is 60 ÷ 5 = 12 pages."
      }
    ]
  },
  {
    id: "range", title: "Range", icon: "ruler", cue: "Spread between extremes",
    heading: "How far apart are the extremes?",
    intro: "The range describes how spread out the values are, from the smallest to the largest.",
    hook: "Range = largest value − smallest value. Use both ends of the data set.",
    idea: "Compare the extremes",
    example: "The garden club recorded counts of 4, 7, 4, 6 and 9 butterflies.",
    steps: [["Smallest count", "4"], ["Largest count", "9"], ["Range", "9 − 4 = 5 butterflies"]],
    takeaway: "If every observation has the same value, the range is 0.",
    discuss: "Can you change a number in the middle and keep the range exactly the same?",
    labTitle: "Spread on a number line", labSub: "Add a large observation and see how the range changes.",
    location: "Bird hide",
    questions: [
      {
        title: "Quiet day, busy day",
        scene: "The bird club counted birds in the garden on four mornings. Lina wants to compare the busiest morning with the quietest.",
        evidence: {"label": "Birds per morning", "values": [12, 7, 9, 15]},
        prompt: "What is the range of the bird counts?",
        answer: 8,
        hint: "Find the largest and smallest counts.",
        solution: "The busiest morning had 15 birds and the quietest had 7. The range is 15 − 7 = 8 birds."
      },
      {
        title: "The sixth morning",
        scene: "Over five mornings the bird club saw as few as 6 birds and as many as 11. On the sixth morning the club saw 15 birds.",
        prompt: "What is the range after adding the sixth morning?",
        answer: 9,
        hint: "Decide which extreme changes when 15 is added.",
        solution: "The smallest count stays 6, and the largest becomes 15. The new range is 15 − 6 = 9 birds."
      },
      {
        title: "Compare two birdwatching teams",
        scene: "Teams A and B counted birds on four mornings. Aya says Team B’s range is bigger because its largest count is bigger.",
        evidence: {"label": "Birds per morning", "values": [["Team A", "4, 7, 9, 12"], ["Team B", "5, 7, 11, 13"]]},
        prompt: "Which statement about the ranges is true?",
        type: "choice",
        options: ["Team A has a larger range.", "Team B has a larger range.", "Both teams have the same range."],
        answer: 2,
        hint: "Compare the two extremes within each team before comparing the teams.",
        solution: "Team A’s range is 12 − 4 = 8 and Team B’s range is 13 − 5 = 8. The ranges are equal."
      }
    ]
  },
  {
    id: "represent", title: "Data Displays", icon: "table", cue: "Tables, charts and keys",
    heading: "Can two pictures show the same data?",
    intro: "A frequency table, pictogram and bar chart can show the same counts in different ways.",
    hook: "Read the labels, key and scale before taking a number from a display.",
    idea: "Read the key before counting",
    example: "A garden pictogram uses one full leaf for 2 plants. Monday has two full leaves and a half leaf.",
    steps: [["Read the key", "1 full leaf = 2 plants"], ["Read the marks", "2 full leaves + ½ leaf"], ["Convert to plants", "2 + 2 + 1 = 5"]],
    takeaway: "On a frequency table of scores, the total number of pupils is the sum of the frequencies.",
    discuss: "Which display makes it easiest to compare two days? Which makes it easiest to read exact totals?",
    labTitle: "One data set, three views", labSub: "Switch displays. The same three plant counts stay the same.",
    location: "Garden map",
    questions: [
      {
        title: "Water the blue bed",
        scene: "Dana is in charge of watering the Blue bed. The garden map uses leaf symbols to show how many seedlings are in each bed.",
        prompt: "How many seedlings are in the Blue bed?",
        data: "seedlings",
        view: "picture",
        answer: 4,
        hint: "Use the key to convert each leaf symbol into a number of seedlings.",
        solution: "The Blue bed has two full leaf symbols. Each stands for 2 seedlings, so there are 4 seedlings."
      },
      {
        title: "Plan the supply trays",
        scene: "Ira needs one label for every seedling. She is preparing trays for the Red bed and the Gold bed.",
        prompt: "How many more labels does the Red bed need than the Gold bed?",
        data: "seedlings",
        view: "picture",
        answer: 2,
        hint: "A half leaf stands for one seedling. Read each row, then find the difference.",
        solution: "The Red bed has 3 full leaves and a half, or 7 seedlings. The Gold bed has 2 full leaves and a half, or 5 seedlings. Ira needs 7 − 5 = 2 more labels for Red."
      },
      {
        title: "The reading corner tally",
        scene: "Five pupils report how many books they read. The librarian groups equal counts in a frequency table.",
        prompt: "What is the mean number of books per pupil?",
        data: "books",
        view: "table",
        answer: 3.4,
        hint: "Find the total books by multiplying each book count by its frequency. Then divide by the number of pupils.",
        solution: "There are 2 × 2 + 3 × 1 + 5 × 2 = 17 books across 2 + 1 + 2 = 5 pupils. The mean is 17 ÷ 5 = 3.4 books."
      }
    ]
  },
  {
    id: "detective", title: "Data Detective", icon: "search", cue: "Choose a useful summary",
    heading: "Which number tells the better story?",
    intro: "The best summary depends on the question. One unusually large value can pull the mean up.",
    hook: "Use the median for the middle observation, the mean for equal share, the mode for what occurs most often, and the range for spread.",
    idea: "Look for values far from the rest",
    example: "Five waits lasted 4, 5, 5, 6 and 20 minutes.",
    steps: [["Mean", "40 ÷ 5 = 8 minutes"], ["Median", "5 minutes"], ["Compare with most waits", "Four of five waits lasted 4–6 min"]],
    takeaway: "Here the median is more representative of a usual wait. The mean still describes the equal share of all 40 minutes.",
    discuss: "What question would make the mode more helpful than the median?",
    labTitle: "The outlier dial", labSub: "Change only the fifth wait time and watch the summaries.",
    location: "Field desk",
    questions: [
      {
        title: "Which size should we order?",
        scene: "The volunteer booth offers T-shirts in small, medium and large. It wants extra stock in the size requested most often.",
        prompt: "Which summary tells the booth what it needs to know?",
        type: "choice",
        options: ["Mean", "Mode", "Range"],
        answer: 1,
        hint: "Think about which summary works for labels such as small, medium and large.",
        solution: "The mode tells the booth which shirt size was requested most often."
      },
      {
        title: "A long wait for juice",
        scene: "Five visitors time the juice queue. The blender stopped for a while, so one customer waited much longer.",
        evidence: {"label": "Queue times in minutes", "values": [3, 4, 4, 5, 19]},
        prompt: "Find the median wait and then the mean wait, both in minutes.",
        fields: ["Median (min)", "Mean (min)"],
        answer: [4, 7],
        hint: "Find the middle time first. Then add all five times for the mean.",
        solution: "The middle time is 4 minutes. The five waits sum to 35 minutes, so the mean is 35 ÷ 5 = 7 minutes."
      },
      {
        title: "Two recycling drives",
        scene: "Two clubs collect cans for five days. They use the mean to compare their daily totals and the range to compare how much the counts vary.",
        evidence: {"label": "Cans per day", "values": [["Club A", "4, 5, 5, 6, 20"], ["Club B", "6, 7, 7, 9, 11"]]},
        prompt: "Select every statement supported by the data.",
        type: "multi",
        options: ["The two clubs have the same mean.", "Club B has the higher median.", "Club B has the larger range."],
        answer: [0, 1],
        hint: "Check the totals, middle values and ranges separately.",
        solution: "Both clubs collected 40 cans, so both means are 8. B’s median is 7 and A’s is 5. A’s range is 16 and B’s is 5."
      }
    ]
  },
  {
    id: "exam", title: "Exam Strategy", icon: "check", cue: "Read, plan and check",
    heading: "What does the evidence support?",
    intro: "Start with what the question asks. Pull the exact information you need from the display.",
    hook: "Read the display → name what you need → calculate → check the answer in context.",
    idea: "Turn a question into a plan",
    example: "A stall sold 3 cups of tea, 4 of juice and 6 of water. How many sold in all?",
    steps: [["Read what is counted", "Cups sold"], ["Identify what to combine", "Tea, juice and water"], ["Check the total", "3 + 4 + 6 = 13 cups"]],
    takeaway: "For a question with several statements, check each one against the data.",
    discuss: "Which words tell you whether to add counts or find how many more?",
    labTitle: "Plan before you calculate", labSub: "Choose a question and see which rows it needs.",
    location: "School fair",
    questions: [
      {
        title: "Compare two orders",
        scene: "At the school fair, two stalls keep a tally of drinks sold. Mira is reading Stall A’s tally.",
        prompt: "How many more cups of water than cups of tea did Stall A sell?",
        data: "stalls",
        view: "table",
        type: "choice",
        options: ["2 cups", "4 cups", "10 cups"],
        answer: 1,
        hint: "Use only the Stall A column. Look for the water and tea rows.",
        solution: "Stall A sold 7 cups of water and 3 cups of tea. The difference is 7 − 3 = 4 cups."
      },
      {
        title: "Check the fair report",
        scene: "Mira and Rafi are writing a report about the two drink stalls. They want to publish only statements they can prove from the table.",
        prompt: "Which statements can go in the report? Select all that apply.",
        data: "stalls",
        view: "table",
        type: "multi",
        options: ["Stall A sold more drinks in total.", "The stalls sold the same number of cups of juice.", "Together the stalls sold 10 cups of tea."],
        answer: [1, 2],
        hint: "For total sales, add down each column. For the total of one drink, add across its row.",
        solution: "Stall A sold 15 cups and Stall B sold 16, so the first statement is false. Each stall sold 5 cups of juice. Together they sold 3 + 7 = 10 cups of tea."
      },
      {
        title: "Make the final announcement",
        scene: "The fair is closing and the team is about to announce the combined sales of both stalls.",
        prompt: "Read the table and decide if each announcement is true or false.",
        data: "stalls",
        view: "table",
        type: "judge",
        options: ["Together they sold 31 cups.", "Tea was the drink with the most cups sold across both stalls.", "Together they sold 1 more cup of water than of juice."],
        answer: ["True", "False", "True"],
        hint: "Add across the rows to get a total for each drink. Then compare the three totals.",
        solution: "The stalls sold 10 teas, 10 juices and 11 waters, for a total of 31 cups. Water sold the most, and 11 − 10 = 1 more cup of water than of juice."
      }
    ]
  }
];

const dataSets = {
  plants: { headers: ["Day", "Plants"], rows: [["Monday", 5], ["Tuesday", 6], ["Wednesday", 3]] },
  seedlings: { headers: ["Garden bed", "Seedlings"], rows: [["Red bed", 7], ["Blue bed", 4], ["Gold bed", 5]] },
  books: { headers: ["Books read", "Number of pupils"], rows: [[2, 2], [3, 1], [5, 2]] },
  demoStalls: { headers: ["Drink", "Stall A (cups)", "Stall B (cups)"], rows: [["Tea", 3, 5], ["Juice", 4, 2], ["Water", 6, 5]] },
  stalls: { headers: ["Drink", "Stall A (cups)", "Stall B (cups)"], rows: [["Tea", 3, 7], ["Juice", 5, 5], ["Water", 7, 4]] }
};
