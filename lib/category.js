import _ from "lodash"

export const expenseCategory = [
  { id: "fnd", value: "food_drink", name: "Food & Drinks", color: "#283d3b" },
  { id: "ent", value: "entertainment", name: "Entertainment", color: "#197278" },
  { id: "tran", value: "transport", name: "Transport", color: "#edddd4" },
  { id: "edu", value: "education", name: "Education", color: "#c44536" },
  { id: "misc", value: "misc", name: "Miscellaneous", color: "#772e25" },
]

export const revenueCategory = [
  { id: "sal", value: "salary", name: "Salary", color: "#283d3b" },
  { id: "rent", value: "rent", name: "Rent", color: "#197278" },
  { id: "int", value: "interest", name: "Interest", color: "#edddd4" },
  { id: "funds", value: "funds", name: "Funds & Shares", color: "#c44536" },
  { id: "misc", value: "misc", name: "Miscellaneous", color: "#772e25" },
]

const allCats = [
  { id: "fnd", value: "food_drink", name: "Food & Drinks", color: "#283d3b" },
  { id: "ent", value: "entertainment", name: "Entertainment", color: "#197278" },
  { id: "tran", value: "transport", name: "Transport", color: "#edddd4" },
  { id: "edu", value: "education", name: "Education", color: "#c44536" },
  { id: "misc", value: "misc", name: "Miscellaneous", color: "#772e25" },
  { id: "sal", value: "salary", name: "Salary", color: "#283d3b" },
  { id: "rent", value: "rent", name: "Rent", color: "#197278" },
  { id: "int", value: "interest", name: "Interest", color: "#edddd4" },
  { id: "funds", value: "funds", name: "Funds & Shares", color: "#c44536" },
  { id: "misc", value: "misc", name: "Miscellaneous", color: "#772e25" },
]

export const categorized = (txns) => {

  const cats = _.chain(txns).groupBy("category").value()

  let mapped = Object.keys(cats).map((k) => {
    let value = cats[k].reduce((sum, o) => sum + o["amount"], 0)
    let cat = allCats.filter((c) => c.value === k)[0]
    let id = cat.id
    let label = cat.name
    let color = cat.color
    return { value, id, label, color }
  })

  return mapped

}
