from datasets import load_dataset
import pandas as pd

file_path = "/Users/oobijosyy/Downloads/companies_sorted.csv"
df = pd.read_csv(file_path, usecols=["name", "industry"])

df = df.dropna(subset=["name", "industry"])
df = df.drop_duplicates()

df["name"] = df["name"].str.title()
df["industry"] = df["industry"].str.title()

industry_to_category = {
    # Technology & IT Services
    "Information Technology And Services": "Technology & IT Services",
    "Computer Software": "Technology & IT Services",
    "Computer Networking": "Technology & IT Services",
    "Semiconductors": "Technology & IT Services",
    "Consumer Electronics": "Technology & IT Services",
    "Telecommunications": "Technology & IT Services",
    "Internet": "Technology & IT Services",
    "Wireless": "Technology & IT Services",

    # Finance & Banking
    "Financial Services": "Finance & Banking",
    "Banking": "Finance & Banking",
    "Investment Banking": "Finance & Banking",
    "Insurance": "Finance & Banking",
    "Capital Markets": "Finance & Banking",

    # Healthcare & Pharmaceuticals
    "Hospital & Health Care": "Healthcare & Pharmaceuticals",
    "Pharmaceuticals": "Healthcare & Pharmaceuticals",
    "Biotechnology": "Healthcare & Pharmaceuticals",
    "Medical Devices": "Healthcare & Pharmaceuticals",
    "Health, Wellness And Fitness": "Healthcare & Pharmaceuticals",

    # Retail & Consumer Goods
    "Retail": "Retail & Consumer Goods",
    "Consumer Goods": "Retail & Consumer Goods",
    "Food & Beverages": "Retail & Consumer Goods",
    "Food Production": "Retail & Consumer Goods",
    "Supermarkets": "Retail & Consumer Goods",
    "Restaurants": "Retail & Consumer Goods",
    "Cosmetics": "Retail & Consumer Goods",
    "Sporting Goods": "Retail & Consumer Goods",

    # Transportation & Automotive
    "Automotive": "Transportation & Automotive",
    "Airlines/Aviation": "Transportation & Automotive",
    "Transportation/Trucking/Railroad": "Transportation & Automotive",
    "Package/Freight Delivery": "Transportation & Automotive",
    "Railroad Manufacture": "Transportation & Automotive",

    # Energy & Manufacturing
    "Oil & Energy": "Energy & Manufacturing",
    "Electrical/Electronic Manufacturing": "Energy & Manufacturing",
    "Mechanical Or Industrial Engineering": "Energy & Manufacturing",
    "Machinery": "Energy & Manufacturing",
    "Mining & Metals": "Energy & Manufacturing",
    "Chemicals": "Energy & Manufacturing",
    "Utilities": "Energy & Manufacturing",

    # Defense & Government
    "Military": "Defense & Government",
    "Defense & Space": "Defense & Government",
    "Government Administration": "Defense & Government",
    "Security And Investigations": "Defense & Government",
    "Legislative Office": "Defense & Government",
    "International Affairs": "Defense & Government",

    # Consulting & Professional Services
    "Management Consulting": "Consulting & Professional Services",
    "Accounting": "Consulting & Professional Services",
    "Human Resources": "Consulting & Professional Services",
    "Staffing And Recruiting": "Consulting & Professional Services",
    "Professional Training & Coaching": "Consulting & Professional Services",
    "Outsourcing/Offshoring": "Consulting & Professional Services",

    # Education & Research
    "Education Management": "Education & Research",
    "Higher Education": "Education & Research",
    "Primary/Secondary Education": "Education & Research",
    "Research": "Education & Research",
    "Public Policy": "Education & Research",

    # Logistics & Supply Chain
    "Logistics And Supply Chain": "Logistics & Supply Chain",

    # Hospitality & Entertainment
    "Hospitality": "Hospitality & Entertainment",
    "Media Production": "Hospitality & Entertainment",
    "Broadcast Media": "Hospitality & Entertainment",
    "Entertainment": "Hospitality & Entertainment",

    # Real Estate & Construction
    "Real Estate": "Real Estate & Construction",
    "Commercial Real Estate": "Real Estate & Construction",
    "Civil Engineering": "Real Estate & Construction",
    "Construction": "Real Estate & Construction",
    "Building Materials": "Real Estate & Construction",

    # Other catch-all (you can expand as needed)
    "Farming": "Other",
    "Publishing": "Other",
    "Non-Profit Organization Management": "Other",
    "Professional Training & Coaching": "Other",  # or keep in Consulting
    "Unknown": "Other"
}

df["category"] = df["industry"].apply(
    lambda x: industry_to_category[x] if x in industry_to_category else "Other"
)


print(df.head())
df.to_csv("final_cleaned_data.csv", index=False)


#
# dataset = load_dataset("pointe77/credit-card-transaction" ,split="train[:2000]")
# #unix_time, merchant, category, amt, cc_num, transaction number, is fraud
#
# df = dataset.to_pandas()
#
# columns_to_keep = [
#     "unix_time",    # numeric timestamp
#     "merchant",
#     "category",
#     "amt",
#     "cc_num",   # card number
#     "trans_num",    # transaction number
#     "is_fraud"
# ]
# df = df[columns_to_keep]
# df.isna().sum() #drop rows with missing data
#
# df["unix_time"] = pd.to_numeric(df["unix_time"], errors="coerce")
# df["amt"] = pd.to_numeric(df["amt"], errors="coerce")
# df["is_fraud"] = df["is_fraud"].astype(int)
# df["merchant"] = df["merchant"].str.lower().str.strip()
# df["category"] = df["category"].str.lower().str.strip()
#
# print(df)
# df.to_csv("final_cleaned_data.csv", index=False)
#
