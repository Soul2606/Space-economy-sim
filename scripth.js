
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
	distance_to_start_paragraph.className = "star-system-info-paragraph"
	info_container.appendChild(distance_to_start_paragraph)
	
	const number_of_object_paragraph = document.createElement("p")
	number_of_object_paragraph.textContent = "Number of objects: " + (star_info_elements.length + planet_info_elements.length)
	number_of_object_paragraph.className = "star-system-info-paragraph"
	info_container.appendChild(number_of_object_paragraph)
	
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




function create_planet_info_element(planet_type, planet_earth_mass, planet_hazard_rating, planet_average_surface_temperature, planet_atmosphere_pressure, planet_organics){

	const main_body_div = document.createElement("div")
	main_body_div.className = "planet-list-item"

	const paragraph_type = document.createElement("p")
	paragraph_type.className = "planet-info-item"
	paragraph_type.textContent = "Type: " + planet_type
	main_body_div.appendChild(paragraph_type)

	const paragraph_mass_earth = document.createElement("p")
	paragraph_mass_earth.className = "planet-info-item"
	paragraph_mass_earth.textContent = "Mass E: " + planet_earth_mass.toFixed(2)
	main_body_div.appendChild(paragraph_mass_earth)

	const paragraph_hazard_rating = document.createElement("p")
	paragraph_hazard_rating.className = "planet-info-item"
	paragraph_hazard_rating.textContent = "Hazard rating: " + planet_hazard_rating.toFixed(2)
	main_body_div.appendChild(paragraph_hazard_rating)

	const paragraph_surface_temperature = document.createElement("p")
	paragraph_surface_temperature.className = "planet-info-item"
	paragraph_surface_temperature.textContent = "Average surface temperature: " + planet_average_surface_temperature.toFixed(2) + "k"
	main_body_div.appendChild(paragraph_surface_temperature)

	const paragraph_atmosphere_pressure = document.createElement("p")
	paragraph_atmosphere_pressure.className = "planet-info-item"
	paragraph_atmosphere_pressure.textContent = "Atmosphere pressure: " + planet_atmosphere_pressure.toFixed(2) + "bar"
	main_body_div.appendChild(paragraph_atmosphere_pressure)

	const paragraph_organics = document.createElement("p")
	paragraph_organics.className = "planet-info-item"
	paragraph_organics.textContent = "Organics: " + planet_organics.toFixed(2)
	main_body_div.appendChild(paragraph_organics)

	return main_body_div
}




function create_progress_bar(progress) {
    let outer_div = document.createElement('div');
    outer_div.className = 'progress-bar-border';

    let inner_div = document.createElement('div');
    inner_div.className = 'progress-bar-fill';
	inner_div.style.width = (progress * 100) + "%"

    outer_div.appendChild(inner_div);

    return outer_div;
}




function calculate_hazard_rating_factor_from_temperature(average_surface_temperature){
	return Math.log10((((average_surface_temperature - 293.15) ** 2) / 20000) + 1) + 1
}




function value_difference(value1, value2){
	return Math.sqrt(((value1 - value2) ** 2) + 1)
}




function generate_random_planet(energy_from_stars, solar_wind_intensity, planet_type){
	let type = random_array_element(["terra", "gas giant", "oceania", "super oceania"])
	if(planet_type !== undefined){
		type = planet_type
	}
	
	let mass
	let atmosphere_pressure
	switch (type) {
		case "gas giant":
			mass = Math.sqrt((Math.random() ** 4) * 200) + 4
			atmosphere_pressure = 1
			break;
		case "oceania":
			mass = Math.sqrt((Math.random() ** 4) * 2) + 0.6
			atmosphere_pressure = ((Math.random() ** 4) * 120) + 0.6
			break;
		case "super oceania":
			mass = Math.sqrt((Math.random() ** 4) * 2) + 0.6
			atmosphere_pressure = (Math.random() * 120) + 10
			break;
		default:
			mass = Math.sqrt((Math.random() ** 4) * 4) + 0.05
			atmosphere_pressure = (Math.random() ** 6) * 100 / (solar_wind_intensity + 1)
			break;
	}

	const rare_metals = Math.random() * 5
	const average_surface_temperature = Math.sqrt(energy_from_stars * Math.sqrt(atmosphere_pressure) * 80000)
	const hazard_rating = calculate_hazard_rating_factor_from_temperature(average_surface_temperature) + Math.log10(value_difference(atmosphere_pressure, 1)) + Math.log10(value_difference(mass, 1))
	
	let organics = 0
	switch(type){
		case "terra":
			organics = 1
			break
		case "oceania":
			organics = 0.5
			break
	}
	organics -= Math.max(((hazard_rating - 1) / 4), 0)
	organics -= (1 / (10 * atmosphere_pressure)) + (1.4 ** (atmosphere_pressure - 1)) - 1
	organics -= (value_difference(average_surface_temperature, 293) * 0.02) ** 2
	organics = Math.max(organics, 0)
	
	const planet = new Planet(type, mass, hazard_rating, atmosphere_pressure, 0, 0, 0, 0, "", "", "", rare_metals, organics, average_surface_temperature)
	return planet
}




let planets =[]
planets.push(generate_random_planet(2, 2))
const planet_1 = new Planet("terra", 1, 1, 1, 8000000000, 2000000000000, 1, 0.01, "", "", "", 1, 1, 282)
planets.push(planet_1)
for (let i = 2; i < 90; i++) {

	planets.push(generate_random_planet(1, 1, "terra"))

}
const star_1 = new Star(1, "yellow dwarf")
const starting_system = new Star_system([star_1], planets, 0)


console.log(starting_system)

let planet_info_elements = []
for (let i = 0; i < planets.length; i++) {
	const element = planets[i];
	
	planet_info_elements.push(create_planet_info_element(element.type, element.mass_earth, element.hazard_rating, element.average_surface_temperature, element.atmosphere_pressure, element.organics))
}

const star_info_elements = [create_star_info_element(star_1.type, star_1.mass_solar)]


main_planets_list_element.appendChild(create_star_system_info_element(star_info_elements, planet_info_elements, starting_system.distance_to_start))

main_planets_list_element.appendChild(create_progress_bar(0.2))