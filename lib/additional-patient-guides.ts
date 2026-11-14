import type { PatientTopicGuide } from "./patient-topic-guides";

const sourceChecked = "2026-11-11";
export const additionalPatientGuides: PatientTopicGuide[] = [
  {
    slug: "piles", topic: "Piles (haemorrhoids)",
    title: "Piles: symptoms, bleeding and questions about treatment",
    metaDescription: "Understand piles, when bleeding needs medical attention, and questions to ask about assessment, treatment choices, recovery and follow-up.",
    answer: "Piles, also called haemorrhoids, involve swollen blood vessels in or around the anus and lower rectum. They can cause itching, discomfort, a lump or bright-red bleeding after a bowel movement. Bleeding deserves an assessment rather than an assumption that the cause is piles. Seek emergency care for heavy or continuous bleeding or severe pain.",
    relatedSpecialties: ["General surgery", "Colorectal surgery", "Proctology"], procedure: "Piles surgery", sourceChecked,
    sections: [
      { heading: "Start with what has changed", paragraphs: [
        "It can feel awkward to discuss bowel symptoms. Describe when the problem began, whether there is pain, where you notice blood, and whether constipation or straining has changed. Ask for privacy if that helps you explain the concern.",
        "Piles can be internal or external. Other anal and bowel conditions can cause similar symptoms, so a photograph or search result cannot establish the cause. Tell the clinician about symptoms that persist, return or feel different."
      ] },
      { heading: "What an assessment may involve", paragraphs: [
        "NIDDK describes a medical history and examination, sometimes including an examination of the rectum or a procedure to look inside. Ask what is proposed, why it is useful, and how your privacy will be protected. Bring previous relevant reports and your medicine list."
      ] },
      { heading: "Discuss options before choosing a procedure", paragraphs: [
        "Options may include advice about bowel habits, fibre and symptom relief, an office procedure, or surgery. The assessment determines which are appropriate. Ask what each option is intended to improve and what alternatives apply to you.",
        "If a procedure is suggested, ask about discomfort, time away from work, follow-up and the possibility of symptoms returning. A named technique or advertised package does not replace a discussion of suitability."
      ], points: ["What is causing the bleeding?", "Do I need further investigation?", "Which changes should prompt urgent care?", "Who should I contact after treatment?"] }
    ],
    questions: [
      { question: "Does every case need surgery?", answer: "No. Options range from bowel-habit advice and symptom relief to procedures or surgery. Ask why a particular approach is recommended for your findings." },
      { question: "Can I assume bright-red bleeding is piles?", answer: "No. Unexplained or recurring rectal bleeding needs clinical assessment. Heavy or continuous bleeding needs emergency attention." },
      { question: "Which specialty can I browse?", answer: "General surgery, colorectal surgery and proctology are useful directory categories. The practice can confirm who assesses your concern." }
    ],
    references: [
      { label: "NHS: piles symptoms and care options", url: "https://www.nhs.uk/conditions/piles-haemorrhoids/" },
      { label: "NIH NIDDK: haemorrhoids, assessment and treatment", url: "https://www.niddk.nih.gov/health-information/digestive-diseases/hemorrhoids" }
    ]
  },
  {
    slug: "thyroid", topic: "Thyroid concerns",
    title: "Thyroid symptoms and tests: preparing for your consultation",
    metaDescription: "Understand underactive and overactive thyroid concerns, what blood tests assess, and questions to take to a general physician or endocrinologist.",
    answer: "The thyroid is a gland in the neck that produces hormones affecting how the body works. An underactive thyroid produces too little hormone; an overactive thyroid produces too much. Tiredness or weight changes can have several causes. A clinician uses your history and appropriate tests to assess what is happening.",
    relatedSpecialties: ["General medicine", "Endocrinology"], sourceChecked,
    sections: [
      { heading: "Underactive and overactive are different", paragraphs: [
        "An underactive thyroid is called hypothyroidism. NHS information describes symptoms including feeling cold, constipation, dry skin and tiredness. Symptoms may develop gradually and are not specific enough to diagnose it on their own.",
        "An overactive thyroid is called hyperthyroidism. It may cause heat sensitivity, trembling, palpitations or weight loss. Explain the changes you have noticed rather than using a symptom checklist to decide the diagnosis."
      ] },
      { heading: "Make the report part of a conversation", paragraphs: [
        "Tests may measure thyroid-stimulating hormone, shortened to TSH, and thyroid hormones such as T4. Ask what the results mean together and whether earlier results matter.",
        "Bring the complete report with its date and laboratory reference range. Include your medicine and supplement list, and mention pregnancy or plans for pregnancy where relevant. An isolated number copied from a report is less useful than the full context."
      ] },
      { heading: "Agree on follow-up", paragraphs: [
        "Treatment differs between underactive and overactive thyroid conditions and depends on the cause and circumstances. If medicine is prescribed, ask how to take it, what follow-up is planned and who will review later results. Do not change a dose using an online guide.",
        "Keep previous prescriptions and test reports together. Ask the clinic whether new tests are needed before attending rather than ordering a broad package yourself."
      ], points: ["What do these results establish?", "Is specialist input useful?", "When should I return?", "What changes should prompt an earlier review?"] }
    ],
    questions: [
      { question: "Does tiredness mean I have a thyroid problem?", answer: "Not necessarily. It has many possible causes. A clinician can review the whole picture and decide whether testing is appropriate." },
      { question: "Can I interpret TSH using an online threshold?", answer: "Your clinician should consider the complete report, other results and your circumstances. A single online number cannot provide that assessment." },
      { question: "Which doctor can I start with?", answer: "A general physician can assess initial concerns. Endocrinologists specialise in hormones and may be involved when appropriate." }
    ],
    references: [
      { label: "NHS: underactive thyroid symptoms and diagnosis", url: "https://www.nhs.uk/conditions/underactive-thyroid-hypothyroidism/" },
      { label: "NHS: overactive thyroid overview and assessment", url: "https://www.nhs.uk/conditions/overactive-thyroid-hyperthyroidism/" }
    ]
  },
  {
    slug: "hernia", topic: "Hernia",
    title: "Hernia: noticing a bulge and preparing for a surgical opinion",
    metaDescription: "Read about hernia symptoms, urgent warning signs and questions for a surgeon about assessment, repair options, recovery and follow-up.",
    answer: "A hernia happens when tissue pushes through a weak area or opening in surrounding muscle or tissue. Some cause a bulge in the groin or abdomen. A suddenly painful or tender bulge, especially with vomiting, fever or a bulge that becomes stuck, needs urgent medical attention rather than a routine appointment request.",
    relatedSpecialties: ["General surgery"], procedure: "Hernia repair", sourceChecked,
    sections: [
      { heading: "Explain where and when you notice it", paragraphs: [
        "A bulge may change when you stand, cough or lie down. Tell the clinician where it is, how long it has been present, whether it hurts and whether it has changed recently. Not every lump is a hernia, and some hernias are not visible.",
        "Hernias occur in different places. Ask which type is being considered instead of assuming another person's operation or recovery applies to yours. Mention previous surgery in the area."
      ] },
      { heading: "How the clinician may assess it", paragraphs: [
        "NIDDK describes using a medical history and examination to assess an inguinal, or groin, hernia. Tests may help where the diagnosis needs clarification. Ask what each proposed test would establish and whether an earlier scan can be reviewed."
      ] },
      { heading: "Discuss why a repair is recommended", paragraphs: [
        "The plan depends on the hernia type, symptoms and circumstances. Discuss whether an operation is recommended, which approaches are suitable, and their advantages and limitations.",
        "If repair is proposed, ask about mesh where relevant, anaesthesia, possible complications and recurrence. Plan around work, lifting or caring for a family member. Leave with contact instructions if the swelling changes before a planned visit."
      ], points: ["What type of hernia is it?", "Why is this plan recommended?", "What alternatives should I understand?", "What help might I need at home?"] }
    ],
    questions: [
      { question: "Does every bulge need an immediate operation?", answer: "A clinician must establish the cause and urgency. The plan varies; an online guide cannot decide whether waiting is appropriate." },
      { question: "Which changes need urgent help?", answer: "Sudden severe pain, tenderness, vomiting, fever or a bulge that becomes stuck are warning signs described by NIDDK. Seek urgent care." },
      { question: "Can I choose a repair by its advertised name?", answer: "Discuss the technique, alternatives and risks with the treating surgeon. Suitability depends on the clinical assessment." }
    ],
    references: [
      { label: "NHS: hernia types and symptoms", url: "https://www.nhs.uk/conditions/hernia/" },
      { label: "NIH NIDDK: inguinal hernia assessment and warning signs", url: "https://www.niddk.nih.gov/health-information/digestive-diseases/inguinal-hernia" }
    ]
  },
  {
    slug: "fatty-liver", topic: "Fatty liver",
    title: "Fatty liver on a scan: understanding the finding and next steps",
    metaDescription: "Understand fatty liver, MASLD and older NAFLD terminology. Prepare questions about assessment, liver scarring, related conditions and follow-up.",
    answer: "Fatty liver means fat has built up in the liver. It may cause no symptoms and is often found during tests for another reason. Reports may use NAFLD or newer MASLD terminology. A clinician can explain the finding, consider possible causes and decide whether further checks are needed.",
    relatedSpecialties: ["General medicine", "Gastroenterology", "Hepatology"], sourceChecked,
    sections: [
      { heading: "A scan finding is a starting point", paragraphs: [
        "Ask what the scan establishes and what it cannot tell you alone. The discussion may include whether inflammation or scarring is present, rather than focusing only on the presence of fat.",
        "NHS guidance describes further assessment using history, blood tests or scans where appropriate. The clinician may ask about alcohol intake and other health conditions. Sharing the complete picture helps the assessment."
      ] },
      { heading: "Understand the language on the report", paragraphs: [
        "NHS information uses MASLD alongside the older NAFLD name. You may also encounter MASH or NASH when inflammation is discussed. Ask which term applies and whether it changes your follow-up.",
        "NIDDK distinguishes fat accumulation from disease involving inflammation and liver damage. This guide cannot establish a stage from the wording of your scan. Ask how severity will be assessed and whether a specialist opinion is needed."
      ] },
      { heading: "Make a manageable plan", paragraphs: [
        "Care may include discussing diet, activity and associated conditions. Ask what changes suit your circumstances and how progress will be reviewed. A plan you understand is more useful than restrictions copied from social media.",
        "Bring previous liver reports and information about diagnosed diabetes, blood pressure or cholesterol concerns. Include medicines and supplements. Ask before starting a liver 'detox', supplement or medicine based on an advertisement."
      ], points: ["What is the likely cause?", "Is there evidence of inflammation or scarring?", "Which follow-up tests are useful?", "Who will review the results and when?"] }
    ],
    questions: [
      { question: "Can fatty liver occur without symptoms?", answer: "Yes. NHS and NIDDK information describe people having few or no symptoms, with the finding made during other investigations." },
      { question: "Does fatty liver always mean cirrhosis?", answer: "No. Fat accumulation and advanced scarring are different findings. A clinician can assess what is present and explain the implications." },
      { question: "Should I buy tests before the appointment?", answer: "Ask which existing results to bring and whether further tests are useful. Investigations depend on the assessment rather than a universal package." }
    ],
    references: [
      { label: "NHS: fatty liver and MASLD assessment", url: "https://www.nhs.uk/conditions/non-alcoholic-fatty-liver-disease/" },
      { label: "NIH NIDDK: fatty liver, inflammation and diagnosis", url: "https://www.niddk.nih.gov/health-information/liver-disease/nafld-nash" }
    ]
  }
];

export const pcosGuide: PatientTopicGuide = {
  slug: "pcos-pcod", topic: "PCOS / PCOD and PMOS",
  title: "PCOS: period changes, hormone concerns and planning your care",
  metaDescription: "Prepare for a PCOS consultation, understand the newer PMOS name, and ask about symptoms, assessment, fertility goals and longer-term hormone care.",
  answer: "PCOS is a familiar name for a hormone-related condition affecting periods, skin, hair growth, fertility and metabolic health. The NHS now uses PMOS, or polyendocrine metabolic ovarian syndrome. WHO's PCOS information is another reference. If your report says PCOD, ask your clinician to explain the terminology and findings in your case.",
  relatedSpecialties: ["Gynaecology", "Endocrinology"], sourceChecked,
  sections: [
    { heading: "Start with what matters to you", paragraphs: [
      "Your concern might be unpredictable periods, acne, hair changes, fertility, energy or emotional wellbeing. Describe what is affecting everyday life and what you hope to understand. The conversation does not have to focus only on pregnancy or weight.",
      "Bring period records if you have them, previous results and a medicine list. Tell the clinician how things have changed over time. Ask for explanations in language that feels comfortable."
    ] },
    { heading: "Why a scan is not the whole diagnosis", paragraphs: [
      "WHO describes assessment of menstrual patterns, androgen signs or results, and ovarian findings while excluding other causes. It also states that ovarian cysts are not required for diagnosis. One scan label is not the full clinical picture.",
      "The NHS describes blood tests and, where appropriate, ultrasound as part of assessment. Ask which tests apply to your age, history and concerns, and what each result contributes."
    ] },
    { heading: "Agree on priorities and follow-up", paragraphs: [
      "Gynaecologists or endocrinologists may be involved in different aspects of care. Discuss menstrual health, metabolic concerns and any fertility goals together. Ask how the plan reflects your priorities.",
      "WHO also recognises effects on emotional wellbeing and the impact of stigma. You can ask for support with distress alongside physical symptoms. Agree who will review results and when to return."
    ], points: ["What supports the diagnosis?", "Which other causes are being checked?", "Which concern can we address first?", "What follow-up supports my longer-term health?"] }
  ],
  questions: [
    { question: "Are PCOS and PMOS both names I may encounter?", answer: "Yes. The NHS now uses PMOS and explains that it used to be called PCOS. WHO's fact sheet still uses PCOS. Ask how the terms apply to your records." },
    { question: "Does an irregular period prove PCOS?", answer: "No. Similar symptoms can have other causes. A clinician considers the history and appropriate investigations." },
    { question: "Do I always need an ultrasound?", answer: "The investigations depend on your circumstances. Ask what each proposed test would clarify; a scan alone does not establish the whole diagnosis." }
  ],
  references: [
    { label: "WHO: PCOS symptoms, diagnosis and shared decisions", url: "https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome" },
    { label: "NHS: PMOS, previously called PCOS", url: "https://www.nhs.uk/conditions/polyendocrine-metabolic-ovarian-syndrome-pmos/" }
  ]
};
