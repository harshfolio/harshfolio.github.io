---
title: "Building a Medical AI Assistant: The Paradoxes That Shaped the Architecture"
description: "A deep dive into the product thinking behind a medical AI assistant, exploring the paradoxes of safety, personalization, and simplicity."
date: 2025-10-18
draft: false
tags: ["type/writing", "topic/product-management", "topic/artificial-intelligence"]
---

## The Signal

The pattern started showing up everywhere.

Instagram DMs. "Hey, what should I use for acne?" WhatsApp threads with prescription photos. "Can you recommend products from this?" Social media comments. "I can't afford a dermatologist, but Google gives me ten different answers and I don't know which one to trust."

This wasn't just noise. This was a consistent signal from actual customers with real skin concerns, trying to get help in the most accessible way they knew how (sending a message to a brand they trusted).

The interesting thing about these messages wasn't just that people were asking for recommendations. It was that they were asking with context. They had budgets ("I can only spend ₹500 total"). They had constraints ("I don't want a 10-step routine"). They had specific situations ("I'm already using this prescription, what else do I need?"). They had anxiety about getting it wrong ("Will this react with what I'm using?").

(This pattern recognition thing is important. I'm not just describing customer messages. I'm showing you that these weren't random support tickets. They were structured requests with constraints. That's a product signal, not a support problem.)

And here's what clicked for me: everyone's skin is genuinely unique. Not in a marketing-fluff way, but in a real product-requirement way. Your skin type, your concerns, your budget, your willingness to follow a routine, your personal goals (clear skin fast vs gradual improvement vs maintenance), the products you're already using, the medications you're on. These aren't just personalization variables to optimize conversion. These are actual constraints that determine whether a recommendation will work or fail for someone.

We already had Limechat (a basic GPT-powered WhatsApp bot) running customer support, and it was generating significant product sales despite being, well, pretty limited. It couldn't process images. It gave generic recommendations. It had no medical routing. It didn't understand dermatology beyond what GPT-4 knows generally.

But it was working. Which meant the demand existed. The question wasn't "do users want AI skincare recommendations?" (We already knew the answer.) The question was "what would a properly sophisticated system look like?"

So we started building.

## The Core Belief

Before I get into the paradoxes (which are the interesting part), here's the hypothesis we were operating from:

What if we could build something that understood all these dimensions? Not just "here's a product for acne" but "here's a product for acne that fits your ₹500 budget, works with your sensitive skin, fits into a 3-step routine, and doesn't conflict with the prescription you just showed me."

This sounds straightforward until you actually try to build it. Then you realize you're not building a recommendation engine. You're building something that has to navigate medical safety boundaries, respect budget constraints, educate users without overwhelming them, and know when to hand off to an actual doctor.

(I spent months thinking this was a personalization problem. It's not. It's a constraint satisfaction problem wrapped in a medical safety problem. That reframing changed everything.)

Which brings me to the paradoxes.

## The Paradoxes (Where Product Thinking Gets Hard)

### Paradox 1: Instant Answers vs Medical Safety

Users upload photos of their skin. Rashes. Acne. Discoloration. Sometimes concerning stuff (potential infections, severe reactions).

They want instant diagnosis. "What is this?"

Here's the tension: we're an e-commerce company, not doctors. Where's the line?

Wrong answer equals dangerous (misdiagnosis, delayed treatment, wrong products making things worse). No answer equals useless (if the AI can't help with skin conditions, what's the point?).

This is the kind of paradox that keeps you up at night. Too conservative and you've built an expensive "consult a doctor" button. Too aggressive and someone gets hurt. And there's no clean formula for where to draw that line.

We had to figure out: when can the system provide guidance, and when must it refuse and route to a consultation?

This wasn't a technical question. This was a product boundary question. And it required actual medical input to answer (we consulted dermatologists to understand how they diagnose, what red flags they look for, when they're confident vs when they need more information).

The product decision we landed on: The system can provide educational information and suggest likely conditions, but it cannot diagnose. One question at a time, systematic inquiry (onset, location, triggers, description), mandatory image request after 2-3 questions to improve accuracy, and conservative escalation (any uncertainty or serious symptoms triggers consultation referral).

(Notice what we're doing here. We're not solving the paradox. We're drawing a boundary and accepting trade-offs. The system will miss some opportunities to help because it's being conservative. That's the cost of not hurting anyone.)

This became a hard constraint in the Diagnosis Agent architecture. Not "try to diagnose," but "gather information systematically and know your limits."

### Paradox 2: Personalization vs Budget Constraints

Here's a real scenario: User asks "What's the best serum for hyperpigmentation?"

The actual best answer might be a ₹3500 product. But the user has ₹500 total budget for their entire routine.

Do we recommend "the best" (which they can't afford, making the recommendation useless)? Or do we recommend "the best for ₹500" (which might not be very effective, setting false expectations)?

This gets even more complex when you're building a full routine. Morning routine needs cleanser, serum, moisturizer, sunscreen. Evening routine needs the same minus sunscreen. If someone has ₹1500 total budget, how do you allocate it across steps? Spend more on the serum and less on the cleanser? Equal distribution? Depends on their primary concern?

I'm dwelling on this because it's not a technical optimization problem. It's a value judgment about what "best" means. Best effectiveness? Best value? Best fit for constraints? These are different optimization functions, and you can't serve all of them simultaneously.

And what if they want optional additions (eye cream, retinol, supplements)? Do you proactively suggest these knowing it'll increase the total cost? Or wait until they ask?

This paradox shaped the Products Agent workflow entirely. We couldn't just run a product search and return results. We needed to systematically collect constraints first.

The solution: One question at a time (never overwhelm with multiple questions). Collect domain (face/body/hair), then scope (morning/evening/both), then skin type, then concerns, then preferences, and only after all routine steps are defined, ask for budget per step.

This way, users understand what they're budgeting for. They're not surprised by the total cost. They can make trade-offs ("I'll skip the eye cream and spend that ₹800 on a better serum").

Budget became a first-class constraint, not an afterthought. (This feels obvious now, but it took watching users get sticker shock from well-intentioned recommendations to figure it out.)

### Paradox 3: Simplicity vs Comprehensiveness

Users want "tell me what to buy." Simple. Direct.

But skincare isn't one product. You need cleanser, serum, moisturizer, sunscreen (minimum). Maybe exfoliant. Maybe retinol. Maybe supplements. Depends on your concerns and goals.

How much do we educate vs how much friction do we add?

If we just recommend a serum, the user might buy it but not know how to use it in a complete routine. If we recommend a full 8-step routine, we might overwhelm them and they buy nothing.

This is where product intuition has to balance user psychology with actual effectiveness. Too simple equals ineffective. Too complex equals abandoned.

We studied how actual dermatologists structure consultations. They don't dump a full routine on you immediately. They assess (what's the concern?), educate (here's what's happening), recommend a base routine (these are your core steps), then offer enhancements (if you want faster results, consider adding this).

This became the pattern for the Products Agent. Start with mandatory steps for the routine type (face morning = cleanser, serum, moisturizer, sunscreen). Then ask about optional additions (eye cream? supplements? retinol?). Only recommend what the user explicitly wants.

(See what's happening here? We're not inventing new patterns. We're translating existing expert behavior into async, text-based interactions. The domain expertise already figured out how to balance comprehensiveness and overwhelm. We just needed to learn from it.)

We also had to decide: do we explain why each step matters, or just list products? The answer (again, from watching doctor consultations): brief context, not lectures. "Sunscreen is essential for preventing further pigmentation" not "here's a 3-paragraph explanation of UV damage and melanin production."

### The Underlying Tension: Friction vs Safety

Woven through all these paradoxes is a meta-question: when do we add friction to ensure safety?

Medical AI has this trap where reducing friction (instant answers, no questions, just recommendations) can be dangerous. But adding too much friction (endless questions, disclaimers, "consult a doctor" for everything) makes the system useless.

This is where I started thinking about friction differently. Not as something to minimize universally, but as a design choice. Good friction protects users. Bad friction is just lazy engineering showing through.

We had to be intentional about where we add friction:
- Diagnosis Agent asks one question at a time (friction that improves accuracy)
- Diagnosis Agent requests images after 2-3 questions (friction that prevents misdiagnosis)
- Diagnosis Agent routes to consultation for serious symptoms (friction that ensures safety)
- Products Agent collects constraints systematically (friction that improves personalization)

But we removed friction elsewhere:
- Router Agent maintains conversation flow (no "start over")
- Products Agent remembers previous context (no re-asking for skin type if you just told the Diagnosis Agent)
- All agents speak naturally, not like medical textbooks (no jargon barrier)

The product philosophy: Add friction that serves the user's best outcome, remove friction that's just system complexity.

## The Architecture That Emerged

So here's where product thinking meets technical decisions.

We debated single agent vs multi-agent architecture. Initially it seemed like complexity for complexity's sake (why not just one smart agent that does everything?).

But when you map the paradoxes to the architecture, multi-agent stops being a technical choice and starts being a product requirements decision.

(I'm spending time on this because a lot of people building AI products right now are making architecture decisions based on what sounds cool or what the latest research paper recommends. But architecture should follow from your product constraints, not from engineering aesthetics.)

Different paradoxes need different logic:
- Medical safety paradox → needs conservative, systematic inquiry → Diagnosis Agent
- Budget personalization paradox → needs constraint collection workflow → Products Agent
- User intent clarity paradox → needs routing to prevent wrong tool for wrong job → Router Agent

We ended up with six specialized agents:
- **Router Agent**: Classifies intent and maintains conversation flow
- **Diagnosis Agent**: Systematic medical inquiry with conservative escalation
- **Products Agent**: Structured personalization and routine building
- **Search Agent**: Direct product/brand searches
- **Prescription Agent**: OCR and prescription analysis
- **Support Agent**: Customer service and policy questions

Each agent encoded specific product constraints:
- Diagnosis Agent has a hard rule: one question at a time, always. Because multiple questions overwhelm users during medical inquiry.
- Products Agent has a hard rule: collect all constraints before calling the product search tool. Because recommendations without constraints are useless.
- Router Agent has flow protection logic: if an agent is mid-workflow, don't interrupt unless the topic change is completely obvious. Because context switching breaks personalization.

The architecture mapped to product requirements, not tech-for-tech's-sake.

Here's what I mean by that: if your product constraints are genuinely uniform across use cases, a single agent is simpler and better. But if your constraints conflict (be conservative vs be helpful, minimize questions vs gather context, recommend best vs respect budget), forcing everything into one agent creates a tangle of if/else logic that serves nobody well. Multi-agent lets you encode different optimization functions cleanly.

## Designing the Diagnosis Agent (A Deep Dive)

Let me go deep on one agent to show the product thinking.

The Diagnosis Agent handles the medical safety paradox. How do you provide helpful guidance without crossing into dangerous territory?

We started by understanding how actual dermatologists diagnose. Not from medical textbooks, but from watching real consultations and interviewing our company dermatologists.

(This was the most valuable thing we did. I sat in on probably 30 consultations, just observing. Not to extract answers, but to understand the thinking process. How do experts navigate uncertainty in real time?)

Here's what we learned:
1. **Initial context is critical**: Age and gender matter (hormonal acne in a 16-year-old vs a 35-year-old are different)
2. **Systematic inquiry reveals patterns**: Onset (when did this start?), Location (where on the body?), Triggers (what makes it better or worse?), Description (what does it look like and feel like?)
3. **Visual confirmation reduces uncertainty**: Dermatologists always want to see the condition if possible
4. **Conservative approach for serious symptoms**: When in doubt, escalate
5. **One question at a time builds trust**: Patients get overwhelmed by questionnaire-style multi-question dumps

This became the Diagnosis Agent design:

**Phase 1 - Initial Assessment**
- First message: Ask for age and gender
- Why: Diagnostic relevance (not just personalization theater)

**Phase 2 - Systematic Inquiry**
- One question per response, focusing on clinical areas (onset, location, triggers, description)
- Why: Builds a differential diagnosis, reduces cognitive load
- Limit: 6-8 total questions unless absolutely needed
- Why: Respect user time, prevent fatigue

**Phase 3 - Image Request**
- After 2-3 questions, if no image provided, request a clear photo
- Explain why: "Sharing an image could improve diagnostic accuracy by up to 40%"
- Why this timing: Early enough to be useful, late enough that user is invested
- Exception: Never request images of intimate areas
- Why: Privacy and appropriateness boundaries

(That 40% number isn't made up. We asked dermatologists how much more confident they felt with images vs text-only descriptions. The answer was consistently "way more confident." We translated "way more" into something quantifiable for users.)

**Phase 4 - Diagnosis and Next Steps**
- Suggest 1-2 likely conditions with simple explanations (no medical jargon)
- Recommend next steps: Consultation (if uncertain or serious), Lifestyle triggers (if relevant), Routine recommendation (if appropriate)
- Always use condition names (not vague "this is common")
- Why: Users deserve clarity, not hedging

**Phase 5 - Escalation Triggers**
- Symptoms overlap or unclear → Consultation
- Red flags (severe symptoms, potential infection, urgent concerns) → Consultation
- Insufficient information after 8 questions → Consultation
- Why: Conservative bias for medical safety

**The Product Insight**: Medical AI needs to know what it doesn't know.

The Diagnosis Agent isn't trying to be a doctor. It's trying to be a systematic, safe, helpful guide that knows its limits.

We even split it into two modes:
- **Diagnostic Mode**: For personal symptoms (triggers the systematic inquiry)
- **Educational Mode**: For general questions like "how does retinol work?" or "can I use niacinamide with vitamin C?" (triggers web search and evidence-based explanations)

This mode distinction came from a product realization: users asking "how does retinol work?" don't want a 6-question diagnostic interview. They want a quick, credible answer. Different intent, different workflow.

(We didn't design this upfront. We discovered it after watching the first version annoy users by asking "when did your retinol curiosity start?" for general knowledge questions. Sometimes you learn by shipping something slightly wrong.)

## What This Taught Me About Medical AI Products

I'm not going to pretend this was a smooth, linear process. We rebuilt this thing once (the March 2025 version that got scrapped), learned a ton, and rebuilt it better.

(That first version was architecturally sound but behaviorally annoying. It asked too many questions. It hedged too much. It felt like talking to a very cautious lawyer, not a helpful assistant. User feedback was brutally clear about this.)

But here's what crystallized through the process:

**1. Architecture should encode your product constraints**

Multi-agent wasn't a technical preference. It was a product requirements decision. Each paradox needed different logic, different safety rails, different workflows. Trying to smash all that into one agent would've created a mess of if/else statements and conflicting priorities.

When your product constraints are genuinely different across use cases, your architecture should reflect that. Not because it's trendy, but because it makes the constraints explicit and maintainable.

**2. The hardest product work is defining where your product should NOT go**

Figuring out what the Diagnosis Agent should do was interesting. Figuring out where it must refuse to go (and route to consultation instead) was the actual hard product decision.

This required medical expertise (our dermatologists), product judgment (where's the risk-to-value ratio acceptable?), and user psychology (when does "we can't help with this" feel like a failure vs a responsible boundary?).

In medical AI, saying no is a feature, not a bug. But you have to be precise about when and how you say no.

This connects to something larger: the best AI products I've seen aren't trying to do everything. They're doing a specific thing well and routing gracefully when they hit their boundaries. The ambition isn't "replace humans," it's "be genuinely useful within clearly defined limits."

**3. Personalization at scale requires systematic constraint collection**

You can't personalize without constraints. Budget, skin type, routine preferences, ingredient sensitivities. These aren't nice-to-have data points. They're required inputs.

The Products Agent workflow is basically a constraint collection engine. One question at a time, building context, until we have enough information to make actually useful recommendations.

This feels inefficient (so many questions!). But the alternative (generic recommendations that ignore constraints) is worse. It's useless.

The product insight: Friction that serves personalization is worth it. Friction that's just system complexity is not.

**4. Domain expertise shapes product logic**

We couldn't have built this without consulting actual dermatologists. Not because we needed them to review outputs, but because we needed them to teach us how they think.

How do they diagnose in person? What questions do they ask? What red flags do they look for? When are they confident vs uncertain? How do they structure routine recommendations?

Watching them work and then figuring out how to translate that into async, text-based interactions shaped the entire system. The Diagnosis Agent's systematic inquiry isn't random. It's modeled on actual clinical workflows.

Product managers building domain-specific AI need domain expertise embedded in the process, not bolted on at the end for validation.

(Here's what worries me about the current AI product wave: a lot of teams are building systems based on what LLMs can do, not what domain experts actually do. The result is technically impressive products that don't fit how real experts navigate the problem. We got lucky having in-house dermatologists. Not everyone has that luxury.)

## What Comes Next

This is Part 1 (the thinking and architecture). I haven't talked about evaluation, production deployment, user testing, or the organizational dynamics of building this in a founder-driven environment.

That's intentional. This piece is about how we thought through the product paradoxes and why the architecture emerged the way it did.

But I learned something important through this: building AI products isn't about prompt engineering or model selection (though those matter). It's about thinking clearly about constraints, paradoxes, and boundaries. The technical implementation follows from that clarity.

When you're building medical AI, or any AI that touches high-stakes domains, the product thinking is the foundation. Get that right, and the architecture practically designs itself.

Get it wrong, and you'll build something technically impressive that's either dangerous or useless.

We tried to build something that's neither.

(I'm still figuring out if we succeeded. Part 2 will cover what happened when we actually put this in front of users. Spoiler: architecture holds up better than I expected, but there are messy human problems that clean system design can't solve.)

---

*Part 2 will cover taking this to production, user validation, and what we learned from attempting to deploy a medical AI system in a real e-commerce environment. The messy, organizational, human parts that don't fit into clean architectural diagrams.*