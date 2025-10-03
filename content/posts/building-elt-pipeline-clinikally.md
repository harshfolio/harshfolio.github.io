---
title: "Building a modern analytics stack without an engineering degree"
description: "How I built Clinikally's entire analytics infrastructure from scratch using DLT, BigQuery, dbt, and Metabase to serve cross-functional teams."
date: 2025-03-23
draft: false
tags: ["analytics", "bigquery", "dbt", "elt", "data-engineering"]
---

## The Problem

When you're scaling an e-commerce platform serving 100K+ daily users, gut feelings don't cut it. We needed data—clean, reliable, accessible data—for everyone from finance to marketing to make informed decisions.

The challenge? We had data scattered across Shopify, Google Analytics, Google Ads, and various other tools, but no way to connect the dots. No single source of truth. No automated reporting. Just manual exports and endless spreadsheets.

## The Solution: A Modern ELT Stack

I built our entire analytics infrastructure from the ground up. Here's what that looked like:

### 1. Extract & Load: DLT

Rather than writing custom API connectors from scratch, I used [DLT (Data Load Tool)](https://dlthub.com/) to build a robust extraction layer:

- **Shopify API**: Orders, customers, products, inventory
- **Google Analytics**: Traffic, conversions, user behavior
- **Google Ads**: Campaign performance, spend, ROAS

DLT handled the heavy lifting—incremental loads, schema evolution, API rate limiting—while I focused on what mattered: getting the right data flowing.

All raw data landed directly in BigQuery, our data warehouse.

### 2. Transform: dbt

Raw data is messy. dbt helped me transform it into something useful.

I structured the transformation layer following analytics engineering best practices:

**Staging models** → Clean, standardized raw data
- Renamed columns for consistency
- Applied data type conversions
- Standardized timestamps and currencies

**Intermediate models** → Business logic layer
- Calculated customer lifetime value (LTV)
- Built cohort analysis tables
- Created marketing attribution models

**Mart models** → Final, business-ready datasets
- Finance: Revenue tracking, P&L components
- Marketing: Channel performance, CAC, ROAS
- Operations: Inventory turnover, fulfillment metrics

The beauty of dbt? Everything is version-controlled, tested, and documented. When marketing asks "how is CAC calculated?", I can point them to the exact SQL transformation with inline documentation.

### 3. Visualize: Metabase

With clean data in BigQuery, I deployed Metabase as our BI layer.

**What I built:**

- **Finance Dashboard**: Daily revenue, margins, unit economics
- **Marketing Dashboard**: Channel attribution, campaign ROI, customer acquisition costs
- **Operations Dashboard**: Fulfillment rates, inventory alerts, SKU performance

The key was making it self-serve. Instead of analysts being bottlenecks, teams could answer their own questions.

## The Impact

**Before:**
- Finance waiting days for ad-hoc reports
- Marketing flying blind on campaign performance
- No cohort analysis or LTV tracking
- Manual data pulls eating 10+ hours/week

**After:**
- Real-time dashboards updated hourly
- Self-serve analytics for all teams
- Data-driven decision making across the org
- Automated reporting freed up time for actual analysis

## Technical Decisions & Tradeoffs

**Why BigQuery over Redshift/Snowflake?**
Google's ecosystem integration. We were already using Google Analytics and Ads, so native connectors made sense.

**Why dbt over Dataform/Airflow transformations?**
Developer experience. dbt's testing framework, documentation, and lineage graphs are unmatched.

**Why DLT?**
It's built for the modern data stack. Schema evolution, incremental loading, and Python-first approach meant I could move fast.

## Lessons Learned

1. **Start with business needs, not tech**: I didn't build models nobody used. Every table had a clear stakeholder and use case.

2. **Document everything**: Six months later, you won't remember why you filtered out that one weird edge case. Your dbt models should read like a story.

3. **Version control is non-negotiable**: All transformations in git. All migrations tracked. No cowboy SQL in production.

4. **Incremental beats perfect**: Shipped v1 with just Shopify data. Added GA and Ads data later. Got value fast.

## What's Next

Currently exploring:
- Real-time streaming for inventory updates
- ML models for demand forecasting
- Customer churn prediction

But that's a post for another day.

---

**Stack Summary:**
- **Extraction**: DLT (Python)
- **Warehouse**: BigQuery
- **Transformation**: dbt Core
- **Visualization**: Metabase (self-hosted)
- **Orchestration**: Cloud Run + Cloud Scheduler

Want to know more about any specific part of this stack? Drop me a message.
