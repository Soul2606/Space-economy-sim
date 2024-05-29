
const main_planets_list_element = document.getElementById("main-planets-list1")

/* temperature is in kelvin */



class Planet {
	constructor(type, mass_earth, hazard_rating, atmosphere_pressure, population, economy_gdp, stability, access, industry, market_demand, market_supply, rare_metals, organics, average_surface_temperature) {
		this.type =							type
		this.mass_earth =					mass_earth
		this.hazard_rating =				hazard_rating
		this.atmosphere_pressure =			atmosphere_pressure
		this.population =					population
		this.economy_gdp =					economy_gdp
		this.stability =					stability
		this.access =						access
		this.industry =						industry
		this.market_demand =				market_demand
		this.market_supply =				market_supply
		this.rare_metals =					rare_metals
		this.organics = 					organics
		this.average_surface_temperature =	average_surface_temperature
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




function create_star_system_info_element(star_info_elements, planet_info_elements, distance_to_start){
	const main_body_div = document.createElement("div")
	main_body_div.className = "star-system-info"

	const info_container = document.createElement("div")
	info_container.className = "star-system-info-container"
	main_body_div.appendChild(info_container)

	const distance_to_start_paragraph = document.createElement("p")
	distance_to_start_paragraph.textContent = "Distance to start system: " + distance_to_start
	info_container.appendChild(distance_to_start_paragraph)
	
	const system_bodies_dropdown_button = document.createElement("button")
	system_bodies_dropdown_button.className = "star-system-info-system-bodies-dropdown-button"
	main_body_div.appendChild(system_bodies_dropdown_button)

	const system_bodies_dropdown = document.createElement("div")
	system_bodies_dropdown.className = "star-system-info-system-bodies-dropdown-box"
	system_bodies_dropdown.style.display = "none"

	for (let i = 0; i < star_info_elements.length; i++) {
		const element = star_info_elements[i];
		system_bodies_dropdown.appendChild(element)
	}

	for (let i = 0; i < planet_info_elements.length; i++) {
		const element = planet_info_elements[i];
		system_bodies_dropdown.appendChild(element)
	}

	main_body_div.appendChild(system_bodies_dropdown)

	system_bodies_dropdown_button.addEventListener("click", function() {
		system_bodies_dropdown.style.display = system_bodies_dropdown.style.display === "none" ? "block" : "none";
	});

	return main_body_div
}




function create_star_info_element(star_type, star_solar_mass){

	const main_body_div = document.createElement("div")
	main_body_div.className = "star-list-item"

	const paragraph_type = document.createElement("p")
	paragraph_type.className = "star-info-item"
	paragraph_type.textContent = "Type: " + star_type
	main_body_div.appendChild(paragraph_type)

	const paragraph_mass_earth = document.createElement("p")
	paragraph_mass_earth.className = "star-info-item"
	paragraph_mass_earth.textContent = "Mass S: " + star_solar_mass
	main_body_div.appendChild(paragraph_mass_earth)

	return main_body_div
}




function create_planet_info_element(planet_type, planet_earth_mass, planet_hazard_rating, planet_other_traits_list_element){

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




function calculate_hazard_rating_factor_from_temperature(average_surface_temperature){
	return Math.log((((average_surface_temperature - 293.15) ** 2) / 20000) + 1) + 1
}




function generate_random_planet(energy_from_stars, solar_wind_intensity){
	const mass = 0.05 + Math.sqrt(Math.random() * 200)
	const type = random_array_element(["terra", "gas giant", "oceania", "super oceania"])
	let atmosphere_pressure
	type === "gas giant"? atmosphere_pressure = 1: atmosphere_pressure = (Math.random() ** 10) * 200 / (solar_wind_intensity + 1)
	const rare_metals = Math.random() * 5
	const average_surface_temperature = Math.sqrt(energy_from_stars * Math.sqrt(atmosphere_pressure) * 80000)
	const hazard_rating = Math.random() * calculate_hazard_rating_factor_from_temperature(average_surface_temperature) * 6
	let organics = 0
	if(type === "terra"){
		organics = Math.random() * 1.5
	}else if(type === "oceania"){
		organics = Math.random() * 0.5
	}
	organics /= hazard_rating ** 2
	const planet = new Planet(type, mass, hazard_rating, atmosphere_pressure, 0, 0, 0, 0, "", "", "", rare_metals, organics, average_surface_temperature)
	return planet
}




let planets =[]
planets.push(generate_random_planet(2, 2))
const planet_1 = new Planet("terra", 1, 1, "", 8000000000, 2000000000000, 1, 0.01, "", "", "", 1, 1)
planets.push(planet_1)
for (let i = 2; i < 9; i++) {

	planets.push(generate_random_planet(1/(i**2), 1/(i**2)))

}
const star_1 = new Star(1, "yellow dwarf")
const starting_system = new Star_system([star_1], planets, 0)


console.log(starting_system)

let planet_info_elements = []
for (let i = 0; i < planets.length; i++) {
	const element = planets[i];
	
	planet_info_elements.push(create_planet_info_element(element.type, element.mass_earth.toFixed(2), element.hazard_rating.toFixed(2), ""))
}

const star_info_elements = [create_star_info_element(star_1.type, star_1.mass_solar)]


main_planets_list_element.appendChild(create_star_system_info_element(star_info_elements, planet_info_elements, starting_system.distance_to_start))

