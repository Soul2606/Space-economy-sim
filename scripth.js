
const main_planets_list_element = document.getElementById("main-planets-list1")




class Planet {
	constructor(type, mass_earth, hazard_rating, atmosphere_pressure, population, economy_gdp, stability, access, industry, market_demand, market_supply, rare_metals, organics) {
		this.type =						type
		this.mass_earth =				mass_earth
		this.hazard_rating =			hazard_rating
		this.atmosphere_pressure =		atmosphere_pressure
		this.population =				population
		this.economy_gdp =				economy_gdp
		this.stability =				stability
		this.access =					access
		this.industry =					industry
		this.market_demand =			market_demand
		this.market_supply =			market_supply
		this.rare_metals =				rare_metals
		this.organics = 				organics
	}
}




class Star_system {
	constructor(system_stars, system_bodies, distance_to_start){
		this.system_stars = 		system_stars
		this.system_bodies =		system_bodies
		this.distance_to_start =	distance_to_start
	}
}




class Star {
	constructor(mass_solar, type){
		this.mass_solar =	mass_solar
		this.type =			type
	}
}




function random_array_element(array){
	return array[Math.floor(Math.random() * array.length)]
}




function create_star_system_info_element(star_system){
	const main_body_div = document.createElement("div")
	main_body_div.className = "star-system-info"

	const info_container = document.createElement("div")
	info_container.className = "star-system-info-container"
	main_body_div.appendChild(info_container)
	
	const system_bodies_dropdown_button = document.createElement("button")
	system_bodies_dropdown_button.className = "star-system-info-system-bodies-dropdown-button"
	main_body_div.appendChild(system_bodies_dropdown_button)

	const system_bodies_dropdown = document.createElement("div")
	system_bodies_dropdown.className = "star-system-info-system-bodies-dropdown-box"
	main_body_div.appendChild(system_bodies_dropdown)

	return main_body_div
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




function generate_random_planet(){
	const mass = 0.05 + Math.sqrt(Math.random() * 200)
	const type = random_array_element(["terra", "gas giant", "oceania", "super oceania"])
	const hazard_rating = Math.random() * 20
	const atmosphere_pressure = Math.sqrt(Math.random() * 22500)
	const rare_metals = Math.random() * 5
	let organics = 0
	if(type === "terra"){
		organics = Math.random() * 1.5
	}else if(type === "oceania"){
		organics = Math.random() * 0.5
	}
	const planet = new Planet(type, mass, hazard_rating, atmosphere_pressure, 0, 0, 0, 0, "", "", "", rare_metals, organics)
	return planet
}




main_planets_list_element.appendChild(create_planet_list_item_element("terrestrial", "1", "1", ""))

const planet_1 = new Planet("terrestrial", 1, 1, "", 8000000000, 2000000000000, 1, 0.01, "", "", "", 1, 1)
const planet_2 = generate_random_planet()
const star_1 = new Star(1, "yellow dwarf")
const starting_system = new Star_system([star_1], [planet_1, planet_2], 0)

console.log(starting_system)
