# ANSWERS

## Answer 1

1 NF has 5 rules.After examine each of them in this question, I only find 3 rules that violets 1 NF.

- (1) of 1 NF is violated in here. Each column should have atomic value, no multiple values. But food_code and food_description have multiple values.
- (2) of 1 NF is violated in here. Date data is written differently in column dinner_date.
- (5) of 1 NF is violated here. Not every row in the table has a unique primary key, for example member IDs 1 and 3 both have multiple rows. And dinner IDs is also doesn't follow the rule.

## Answer2

Based on the given table, some of the entities that could be extracted

- Members (with attributes member_id, member_name, member_address)
- Dinners (with attributes dinner_id, dinner_date)
- Venues (with attributes venue_code, venue_description)
- Foods (with attributes food_code, food_description)

## Answer 3

- Members Table (member_id (PK), member_name, member_address)
- Dinners Table (dinner_id (PK), dinner_date, venue_code(FK))
- Venues Table (venue_code (PK), venue_description)
- Foods Table (food_code (PK), food_description)
- Members_diners Table (id (PK), member_id (FK), dinner_id (FK))
- Dinners_food Table (id (PK), dinner_id (FK), food_code (FK))
