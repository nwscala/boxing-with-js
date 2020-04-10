# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# Box.create([
#     {name: "A", color: "Red", size: "Normal"},
#     {name: "B", color: "Blue", size: "Very Small"},
#     {name: "C", color: "Yellow", size: "Very Big"}
# ])

# Item.create([
#     {name: "A", size: "Normal", description: "Normal and fuzzy"},
#     {name: "B", size: "Small", description: "Small and sharp"},
#     {name: "C", size: "Big", description: "Large and round"},
# ])

Box.find_by_id(1).update(item_ids: [1, 2])
Box.find_by_id(2).update(item_ids: [2])
Box.find_by_id(3).update(item_ids: [1, 2, 3])