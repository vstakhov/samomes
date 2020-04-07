/**
 * Samomes
 *
 * Copyright (C) 2020 Mikhail Lapshin
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { COMPONENTS } from './constants.js'

export const countTotalIonConcentration = (concentration) => {
  let total = {}
  for (let reagent in concentration) {
    for (let ion in concentration[reagent]) {
      if (total[ion] === undefined) {
        total[ion] = 0
      }
      total[ion] += concentration[reagent][ion]
    }
  }
  return total
}

export const countTotalConcentration = (concentration) => {
  let total = 0
  let totalIonConcentration = countTotalIonConcentration(concentration)
  for (let ion in totalIonConcentration) {
    total += convertIonRatio(ion) * totalIonConcentration[ion]
  }
  return total
}

export const isConcentration = (concentration) => {
  let result = false
  for (let reagent in concentration) {
    for (let ion in concentration[reagent]) {
      if (concentration[reagent][ion]) {
        result = true
      }
    }
  }
  return result
}

export const countTotalIonDose = (solute) => {
  let total = {}
  for (let reagent in solute) {
    for (let ion in solute[reagent]) {
      if (total[ion] === undefined) {
        total[ion] = 0
      }
      total[ion] += solute[reagent][ion]
    }
  }
  return total
}

export const countTotalDose = (solute) => {
  let total = 0
  let totalIonSolute = countTotalIonDose(solute)
  for (let ion in totalIonSolute) {
    total += totalIonSolute[ion]
  }
  return total
}

export const countMass = (reagent) => {
  let mass = 0
  let lastElement
  for (let el of reagent) {
    mass += !isNaN(el)
      ? COMPONENTS[lastElement] * (parseInt(el) - 1)
      : COMPONENTS[el]
    lastElement = el
  }
  return mass
}

export const convertIonName = (ion) => {
  let ions = {
    'N': 'NO3',
    'NO3': 'N',
    'P': 'PO4',
    'PO4': 'P'
  }
  return ion in ions ? ions[ion] : ion
}

export const convertIonRatio = (ion) => {
  return countMass(convertIonName(ion)) / countMass(ion)
}
