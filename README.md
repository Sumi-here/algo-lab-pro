# Algo Lab Pro

Build the frontend foundation for a web application called:

ALGO//BATTLE
Algorithm Decision & Experiment Lab

Tagline:
“Choose. Test. Understand.”

IMPORTANT:
This is the first UI/foundation phase of a larger project. Do NOT attempt to implement the complete algorithm engine, real benchmarking system, recommendation logic, authentication, database, or backend yet.

The goal of this phase is to create a polished, production-quality frontend structure that we can connect to the real algorithm engine later.

1. PRODUCT CONCEPT

ALGO//BATTLE is an interactive algorithm experiment laboratory.

The core idea is not simply to visualize sorting algorithms.

The user should be able to:

DEFINE → RECOMMEND → EXPERIMENT → STRESS TEST → COMPARE → UNDERSTAND

The application will eventually help users answer:

“Which algorithm should I choose for this particular situation, and why?”

For the first version, focus on sorting algorithms.

Algorithms that will eventually be supported:

Bubble Sort

Selection Sort

Insertion Sort

Merge Sort

Quick Sort

Heap Sort

Do not implement their actual logic yet. Create UI components that are ready to receive real algorithm data later.

2. VISUAL STYLE

Create a modern, premium “algorithm laboratory” interface.

Design direction:

Dark modern interface

Professional academic + developer-tool feeling

Clean typography

Strong visual hierarchy

Subtle gradients

Refined cards

Soft borders

Controlled glass effects where appropriate

Smooth micro-interactions

Modern icons

Beautiful data visualization areas

Responsive layout

Plenty of intentional spacing

Do NOT make it look like:

A generic college project

A basic CRUD dashboard

An overly neon cyberpunk website

A template filled with random glowing effects

A cluttered dashboard

An AI chatbot website

The design should feel like a real developer/research tool.

Use animations carefully and purposefully.

3. GLOBAL NAVIGATION

Create a responsive sidebar/navigation system.

Main navigation:

Home

Decision Lab

Experiment Lab

Battle

Stress Lab

Analysis

History

Algorithms

Include a clear “Start Experiment” primary action.

The navigation should work visually even though most functionality is not implemented yet.

Use suitable icons.

4. HOME PAGE

Create a strong hero section.

Main heading:

“ALGO//BATTLE”

Supporting heading:

“Choose. Test. Understand.”

Description:

“Explore how algorithms behave under different conditions. Get a recommendation, run controlled experiments, stress-test your choice, and discover why the results change.”

Primary button:

“Start Experiment”

Secondary button:

“Explore Algorithms”

Below the hero, create visually impressive sections showing:

Decision → Experiment → Insight

Three major stages:

DEFINE
Configure the problem and dataset.

TEST
Run controlled algorithm experiments.

UNDERSTAND
Analyze performance and discover why the results changed.

Also include a section introducing the six sorting algorithms as compact interactive cards.

5. ALGORITHM CARDS

Create reusable AlgorithmCard components.

Each card should visually support:

Algorithm name

Short description

Best case

Average case

Worst case

Space complexity

Stable / Unstable

Adaptive / Non-adaptive

In-place / Not in-place

For now use realistic placeholder values, but structure the components so actual data can later come from the algorithm engine.

Cards should have hover interactions.

Do not overload the cards with text.

6. DECISION LAB PAGE

Create the UI for configuring a problem.

Title:

“Define Your Problem”

Subtitle:

“Tell us what your data looks like and what matters most.”

Create a clean configuration interface.

Dataset section

Allow UI controls for:

Dataset size

Random

Sorted

Reverse sorted

Nearly sorted

Duplicate-heavy

Custom data

Include a visual dataset preview area.

Requirements section

Controls for:

Stability required

Memory priority

Speed priority

Small dataset / Large dataset

Use switches, segmented controls, sliders, and selectable cards where appropriate.

Recommendation preview

Create a prominent result card:

“Recommended Algorithm”

Example:

“INSERTION SORT”

Show:

Suitability score

Why it was recommended

Important properties

Alternative choices

This is currently UI/mock data only.

Add a primary button:

“Test My Decision”

7. RECOMMENDATION PAGE

Create a polished recommendation result screen.

Show:

Recommended algorithm

Example:

INSERTION SORT

Suitability score:

92%

Create a visual score/progress indicator.

Show explanation cards such as:

“Why this choice?”

Nearly sorted data

Small number of changes

Adaptive behavior

Low memory requirement

Also show:

“Other Candidates”

with 2–3 alternative algorithm cards.

Include a button:

“Run Controlled Experiment”

The recommendation should visually feel evidence-based rather than like a chatbot response.

8. EXPERIMENT LAB PAGE

Create the main experiment workspace.

Layout should feel like a professional laboratory.

Include:

Experiment configuration panel

Dataset

Dataset size

Algorithms to compare

Number of trials

Metrics

Metrics:

Execution time

Comparisons

Swaps

Writes

Operations

Main visualization area

Create a large central visualization panel where algorithm animations will eventually appear.

For now create an attractive placeholder visualization using bars/data blocks.

Include controls:

Play

Pause

Step

Reset

Speed

Metrics panel

Create compact live metric cards for:

Time

Comparisons

Swaps

Writes

Operations

Make the layout suitable for real-time updates later.

9. BATTLE PAGE

Create an exciting side-by-side algorithm comparison interface.

Show multiple algorithms competing on the exact same dataset.

Example:

QUICK SORT
vs
MERGE SORT
vs
INSERTION SORT

Create animated visual data bars.

Show each algorithm's current status.

Include:

Start Battle

Pause

Reset

Speed control

Below the visualization create a performance table with:

Algorithm | Time | Comparisons | Swaps | Writes | Result

Make the winner visually identifiable without excessive effects.

10. STRESS LAB

Create a separate page called:

“Stress Lab”

Subtitle:

“Push algorithms into the conditions they hate.”

Create dataset stress-test cards:

Nearly Sorted

Reverse Sorted

Duplicate Heavy

Already Sorted

Random

Large Dataset

Each card should explain the type of stress briefly.

Include:

“Run Stress Test”

and a results area showing how different algorithms behave.

This is initially a frontend structure only.

11. ANALYSIS PAGE

Create a professional experiment analysis dashboard.

Include:

Performance comparison

Interactive chart area for:

Execution time

Comparisons

Swaps

Writes

Create tabs or controls to switch metrics.

Winner section

Example:

“Winner: INSERTION SORT”

Show the winning metrics.

Algorithm Autopsy

Create a visually distinctive section titled:

“Why Did It Win?”

It should eventually explain the result using:

Dataset characteristics

Algorithm properties

Actual measured metrics

Complexity

Practical behavior

For now create realistic placeholder content and component structure.

What Changed?

Create a comparison section where users can compare two experiments.

Example:

Experiment A:
Random dataset

Experiment B:
Nearly sorted dataset

Show how performance changed.

12. PREDICTION MODE

Include UI for a prediction feature.

Before running an experiment:

“Which algorithm do you think will win?”

Show selectable algorithm cards.

After the experiment:

“You predicted: INSERTION SORT”

“Actual winner: QUICK SORT”

Then show a small feedback/result section.

This should feel like an interactive challenge rather than a quiz.

13. HISTORY PAGE

Create an experiment history interface.

Each saved experiment should show:

Experiment name

Date

Dataset type

Dataset size

Algorithms tested

Winner

Key metric

Include:

Search

Filters

Sort options

Create empty-state UI for when no experiments exist.

Use local mock data for now.

14. ALGORITHMS PAGE

Create a searchable algorithm library.

Each algorithm should have a detailed profile view.

Include:

Algorithm name

Description

Complexity

Stability

Adaptiveness

Memory

Strengths

Weaknesses

Best suited for

Worst suited for

Use expandable/detail sections if appropriate.

15. COMPONENT ARCHITECTURE

Build reusable components rather than putting everything into huge page files.

Suggested components:

Sidebar

TopBar

AlgorithmCard

AlgorithmProfile

DatasetSelector

DatasetPreview

RequirementSelector

RecommendationCard

SuitabilityScore

ExperimentConfig

VisualizationPanel

PlaybackControls

MetricCard

PerformanceTable

PerformanceChart

StressTestCard

PredictionCard

AutopsyPanel

ExperimentHistoryCard

EmptyState

Keep components modular and easy to modify later.

16. RESPONSIVENESS

The application must work properly on:

Desktop

Laptop

Tablet

Mobile

Prioritize desktop because this is primarily an interactive laboratory/dashboard application, but do not ignore smaller screens.

17. UX REQUIREMENTS

The interface should make the user's journey obvious.

Primary flow:

Home
↓
Start Experiment
↓
Define Problem
↓
Recommendation
↓
Test My Decision
↓
Experiment Lab
↓
Battle
↓
Analysis
↓
Stress Test
↓
Save Experiment
↓
History

Use clear buttons and visual hierarchy.

Avoid unnecessary popups.

Avoid excessive scrolling where possible.

18. TECHNICAL DIRECTION

Use:

React / TypeScript

Tailwind CSS

Modern component architecture

Lucide icons or another clean icon library

Recharts or another suitable chart library when needed

Framer Motion or lightweight CSS animations where useful

Do not introduce unnecessary libraries.

Do not create a backend yet.

Do not add authentication yet.

Do not add a database yet.

Do not use an external AI API.

Do not implement fake AI.

19. IMPORTANT FUTURE INTEGRATION REQUIREMENT

The UI must be designed so that later we can connect:

Real sorting algorithms

Dataset generators

Metric collection

Recommendation engine

Controlled benchmarking

Stress testing

Experiment history

Real charts

Do not tightly couple mock data to the UI.

Keep data structures clean and replaceable.

Use clear TypeScript interfaces/types for algorithm information, datasets, experiments, metrics, and recommendations where appropriate.

20. QUALITY RULE

This should NOT look like a generated student dashboard.

It should look like a real product that could be shown in a software engineering portfolio.

Prioritize:

Visual polish

Consistency

Usability

Clean spacing

Typography

Responsive behavior

Reusable components

Maintainable code

Use animations to improve interaction, not just decoration.

Do not add random features that are not part of this specification.

Do not invent unrelated functionality.

21. FINAL IMPLEMENTATION RULE

For this phase:

BUILD THE FRONTEND FOUNDATION ONLY.

Use mock/sample data wherever actual algorithm results are required.

Do not pretend that mock benchmark numbers are real measurements.

Keep the architecture ready for the real algorithm engine that will be added in later development phases.

The final result should feel like:

“An interactive algorithm laboratory”

—not:

“A website containing some sorting animations.”

Before finishing, make sure the application has a coherent navigation structure and all major pages/components above are visually connected and usable.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/22a91d7e-d910-416f-b4ed-8b935c0ac7d6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
