
const main_planets_list_element = document.getElementById("main-planets-list1")




class Planets {
	constructor(type, mass_earth, hazard_rating, other_traits, population, economy_gdp, stability, access, industry, market_demand, market_supply) {
		this.type =				type
		this.mass_earth =		mass_earth
		this.hazard_rating =	hazard_rating
		this.other_traits =		other_traits
		this.population =		population
		this.economy_gdp =		economy_gdp
		this.stability =		stability
		this.access =			access
		this.industry =			industry
		this.market_demand =	market_demand
		this.market_supply =	market_supply
	}
}




function create_planet_list_item_element(planet_type, planet_earth_mass, planet_hazard_rating, planet_other_traits_list_element){

	const main_body_div = document.createElement("div")
	main_body_div.className = "planet-list-item"

	const paragraph_type = document.createElement("p")
	paragraph_type.className = "planet-info-item"
	paragraph_type.textContent = "Type: " + planet_type
	main_body_div.appendChild(paragraph_type)

	const paragraph_mass_earth = document.createElement("p")
	paragraph_mass_earth.className = "planet-info-item"
	paragraph_mass_earth.textContent = "Mass E: " + planet_earth_mass
	main_body_div.appendChild(paragraph_mass_earth)

	const paragraph_hazard_rating = document.createElement("p")
	paragraph_hazard_rating.className = "planet-info-item"
	paragraph_hazard_rating.textContent = "Hazard rating: " + planet_hazard_rating
	main_body_div.appendChild(paragraph_hazard_rating)

	const div_other_traits = document.createElement("div")
	div_other_traits.className = "planet-info-item"
	div_other_traits.innerHTML = planet_other_traits_list_element
	main_body_div.appendChild(div_other_traits)

	return main_body_div
}




main_planets_list_element.appendChild(create_planet_list_item_element("terrestrial", "1", "1", ""))