
const main_systems_list_element = document.getElementById("systems-list0")
const planet_overview_base_element = document.getElementById("planet-overview0")

/* temperature is in kelvin */



class Planet {
	constructor(type, mass_earth, hazard_rating, atmosphere_pressure, population, economy_gdp, stability, access, industry, market_demand, market_supply, rare_metals, organics, average_surface_temperature, has_colony) {
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
		this.has_colony =					has_colony
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




function get_object_from_path(object, path){
	if(!Array.isArray(path)){
		throw new Error(path + " is not a valid array")
	}
	if(typeof object !== "object"){
		throw new Error(path + " is not a valid object")
	}

	let current

	for (let i = 0; i < path.length; i++) {
		const key = path[i];
		
		current = current[key]

		if(current === undefined){
			throw new Error(path + " is not a valid path in object " + JSON.stringify(object))
		}
	}

	return current
}




function create_star_system_info_element(star_info_elements, planet_info_table, distance_to_start, number_of_objects){
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
	number_of_object_paragraph.textContent = "Number of objects: " + number_of_objects
	number_of_object_paragraph.className = "star-system-info-paragraph"
	info_container.appendChild(number_of_object_paragraph)
	
	const system_bodies_dropdown_button = document.createElement("div")
	system_bodies_dropdown_button.className = "star-system-bodies-list-button"
	main_body_div.appendChild(system_bodies_dropdown_button)

	const button_arrow = document.createElement("div")
	button_arrow.className = "arrow-down"
	system_bodies_dropdown_button.appendChild(button_arrow)

	const system_bodies_dropdown = document.createElement("div")
	system_bodies_dropdown.className = "star-system-bodies-list-box"
	system_bodies_dropdown.style.display = "none"

	for (let i = 0; i < star_info_elements.length; i++) {
		const element = star_info_elements[i];
		system_bodies_dropdown.appendChild(element)
	}

	system_bodies_dropdown.appendChild(planet_info_table)

	main_body_div.appendChild(system_bodies_dropdown)

	system_bodies_dropdown_button.addEventListener("click", function() {
		if(system_bodies_dropdown.style.display === "none"){
			system_bodies_dropdown.style.display = "block"
			button_arrow.className = "arrow-up"
		}else{
			system_bodies_dropdown.style.display = "none"
			button_arrow.className = "arrow-down"
		}
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




function create_planet_info_element(planet_type, planet_earth_mass, planet_hazard_rating, planet_average_surface_temperature, planet_atmosphere_pressure, planet_organics, planet_has_colony){

	const main_body_div = document.createElement("tr")
	main_body_div.className = "planet-table-row"

	const paragraph_type = document.createElement("td")
	paragraph_type.className = "planet-info-item"
	paragraph_type.textContent = planet_type
	main_body_div.appendChild(paragraph_type)

	const paragraph_mass_earth = document.createElement("td")
	paragraph_mass_earth.className = "planet-info-item"
	paragraph_mass_earth.textContent = String(planet_earth_mass.toFixed(2))
	main_body_div.appendChild(paragraph_mass_earth)

	const paragraph_hazard_rating = document.createElement("td")
	paragraph_hazard_rating.className = "planet-info-item"
	paragraph_hazard_rating.textContent = String(planet_hazard_rating.toFixed(2))
	main_body_div.appendChild(paragraph_hazard_rating)

	const paragraph_surface_temperature = document.createElement("td")
	paragraph_surface_temperature.className = "planet-info-item"
	paragraph_surface_temperature.textContent = (planet_average_surface_temperature -273.15).toFixed(2) + "c"
	paragraph_surface_temperature.style.color = rgb_string_from_temperature(planet_average_surface_temperature)
	paragraph_surface_temperature.style.textShadow = "0 0 " + soft_sign2((planet_average_surface_temperature - 350) / 100, 0, 6) + "px"
	main_body_div.appendChild(paragraph_surface_temperature)

	const paragraph_atmosphere_pressure = document.createElement("td")
	paragraph_atmosphere_pressure.className = "planet-info-item"
	paragraph_atmosphere_pressure.textContent = planet_atmosphere_pressure.toFixed(2) + "bar"
	main_body_div.appendChild(paragraph_atmosphere_pressure)

	const paragraph_organics = document.createElement("td")
	paragraph_organics.className = "planet-info-item"
	paragraph_organics.textContent = String(planet_organics.toFixed(2))
	planet_organics > 0? paragraph_organics.style.color = "green": paragraph_organics.style.color = "white"
	main_body_div.appendChild(paragraph_organics)

	const paragraph_has_colony = document.createElement("td")
	paragraph_has_colony.className = "planet-info-item"
	paragraph_has_colony.textContent = planet_has_colony? ">": "-"
	main_body_div.appendChild(paragraph_has_colony)

	return main_body_div
}




function create_planets_table_element(planet_objects){

	const planets_table = document.createElement("table")
	planets_table.className = "system-planets-table"

	const table_header = document.createElement("tr")
	table_header.className = "planet-info-header"

	const paragraph_type = document.createElement("th")
	paragraph_type.className = "planet-info-item"
	paragraph_type.textContent = "Type"
	table_header.appendChild(paragraph_type)

	const paragraph_mass_earth = document.createElement("th")
	paragraph_mass_earth.className = "planet-info-item"
	paragraph_mass_earth.textContent = "Mass E"
	table_header.appendChild(paragraph_mass_earth)

	const paragraph_hazard_rating = document.createElement("th")
	paragraph_hazard_rating.className = "planet-info-item"
	paragraph_hazard_rating.textContent = "Hazard rating"
	table_header.appendChild(paragraph_hazard_rating)

	const paragraph_surface_temperature = document.createElement("th")
	paragraph_surface_temperature.className = "planet-info-item"
	paragraph_surface_temperature.textContent = "Average surface temperature"
	table_header.appendChild(paragraph_surface_temperature)

	const paragraph_atmosphere_pressure = document.createElement("th")
	paragraph_atmosphere_pressure.className = "planet-info-item"
	paragraph_atmosphere_pressure.textContent = "Atmosphere pressure"
	table_header.appendChild(paragraph_atmosphere_pressure)

	const paragraph_organics = document.createElement("th")
	paragraph_organics.className = "planet-info-item"
	paragraph_organics.textContent = "Organics" 
	table_header.appendChild(paragraph_organics)

	const paragraph_colony = document.createElement("th")
	paragraph_colony.className = "planet-info-item"
	paragraph_colony.textContent = "Colony"
	table_header.appendChild(paragraph_colony)

	planets_table.appendChild(table_header)
	
	

	for (let i = 0; i < planet_objects.length; i++) {
		const planet_object = planet_objects[i]
		const planet_table_row = create_planet_info_element(planet_object.type, planet_object.mass_earth, planet_object.hazard_rating, planet_object.average_surface_temperature, planet_object.atmosphere_pressure, planet_object.organics, planet_object.has_colony)
		
		planet_table_row.addEventListener("click", function(){
			open_planet_overview_panel(planet_object)
		})

		planets_table.appendChild(planet_table_row)
	}

	return planets_table
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




function value_difference(value1, value2){
	return Math.sqrt(((value1 - value2) ** 2) + 1)
}




function dot(value1, value2){
	return 1 / (Math.abs(value1 - value2) + 1)
}




function soft_sign(value){
	return (value / (Math.abs(value) + 1))
}




function soft_sign2(value, min, max){
	return(value / (Math.abs(value) + 1)) * ((max / 2) - (min / 2)) + (max / 2) + (min / 2)
}




function rgb_string_from_temperature(value){
	const color_rgb_string = "rgb("+
	//red
	soft_sign2((value - 290) * 0.08, 0, 255)
	+", "+
	//green
	(205 / (value_difference(value, 280) * 0.03) + (50 * soft_sign2((value - 700) * 0.01, 1, 0)))
	+", "+
	//blue
	soft_sign2((value - 245) * 0.2, 255, 0)
	+")"

	return color_rgb_string
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

	const hazard_rating = 1 + 
		(((average_surface_temperature - 285) ** 2) / 100000) + Math.log10(1.04 ** (average_surface_temperature - 305) + 1) +
		Math.log10(value_difference(atmosphere_pressure, 1)) + 
		Math.log10(value_difference(mass, 1))
	
	let organics = 0
	switch(type){
		case "terra":
			organics = 1
			break
		case "oceania":
			organics = 0.5
			break
	}
	organics -= (1 / (10 * atmosphere_pressure)) + (1.05 ** (atmosphere_pressure)) - 1
	organics -= (average_surface_temperature - 290) ** 2 * 0.0003
	organics = Math.max(organics, 0)
	
	const planet = new Planet(type, mass, hazard_rating, atmosphere_pressure, 0, 0, 0, 0, "", "", "", rare_metals, organics, average_surface_temperature, false)
	return planet
}




function open_planet_overview_panel(planet){
	console.groupCollapsed("open planet overview panel")
	console.log("planet", planet)

	planet_overview_base_element.style.display = "block"

	console.groupEnd()
}




function close_planet_overview_panel(){
	planet_overview_base_element.style.display = "none"
}




let planets =[]

console.groupCollapsed("generated planet with solar energy")
for (let i = 2; i < 24; i++) {
	const planet = generate_random_planet(5/((i * 0.5) ** 2), 1, "terra")

	planets.push(planet)

	console.log(5/((i * 0.5) ** 2))
}
console.groupEnd()

const star_1 = new Star(1, "yellow dwarf")

const starting_system = new Star_system([star_1], planets, 0)


console.log(starting_system)

const star_info_elements = [create_star_info_element(star_1.type, star_1.mass_solar)]

const planets_table_element = create_planets_table_element(planets)

main_systems_list_element.appendChild(create_star_system_info_element(star_info_elements, planets_table_element, starting_system.distance_to_start, planets.length + 1))
