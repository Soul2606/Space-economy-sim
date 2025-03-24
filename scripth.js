
const main_systems_list_element = document.getElementById("systems-list0")
const planet_overview_base_element = document.getElementById("planet-overview0")

/* 
Temperature is in kelvin.
This sim does not care about the systems architecture around multiple stars. It pretends all the other stars don't exist, only the star with the greatest mass
There is no dynamic star system architecture system because thats not the main focus of this app.
*/

class AstronomicalBody {
	constructor(mass=1, satellites=[]) {
		this.mass = mass
		this.satellites = satellites
	}
}




class Planet extends AstronomicalBody{
	constructor(type, mass, hazard_rating, atmosphere_pressure, rare_metals, organics, average_surface_temperature, has_colony) {
		super(mass)
		this.type =							type						//string
		this.hazard_rating =				hazard_rating				//number
		this.atmosphere_pressure =			atmosphere_pressure			//number
		this.rare_metals =					rare_metals					//number
		this.organics = 					organics					//number
		this.average_surface_temperature =	average_surface_temperature	//number
		this.has_colony =					has_colony					//boolean
		this.market = null
	}
}




class Star_system {
	constructor(stars, planets, distance_to_start, name, position){
		this.stars = 				stars
		this.planets =				planets
		this.distance_to_start =	distance_to_start
		this.name =					name
		this.position =				position
	}
}




class Star extends AstronomicalBody{
	constructor(mass_solar, type){
		super()
		this.mass_solar =	mass_solar
		this.type =			type
		this.brightness =	(mass_solar / 2 + 0.75) ** 2
	}
}




class Commodity {
	constructor(name='', amount=0, default_price=2, max_price=3, min_price=1) {
		this.name = name
		this.amount = amount
		this.default_price = default_price
		this.max_price = max_price
		this.min_price = min_price
	}

	price(demand = 0){
		if (typeof demand !== 'number') {
			throw new Error("Invalid parameter");
		}
		return clamp(demand / this.amount, this.min_price, this.max_price)
	}
}




class Commodities {
	constructor(supplies=0, food=0, fertilizer=0, basic_commodities=0, luxury_goods=0, recreational_drugs=0, refined_metals=0, heavy_machinery=0) {
		const valid_keys = ['supplies','food','fertilizer','basic_commodities','luxury_goods','recreational_drugs','refined_metals','heavy_machinery']
		this.supplies =				new Commodity('supplies', 0, 100, 400, 50)
		this.food =					new Commodity('food', 0, 8, 24, 4)
		this.fertilizer =			new Commodity('fertilizer', 0, 8, 24, 4)
		this.basic_commodities =	new Commodity('basic_commodities', 0, 24, 52, 16)
		this.luxury_goods =			new Commodity('luxury_goods', 0, 64, 150, 50)	
		this.recreational_drugs =	new Commodity('recreational_drugs', 0, 200, 600, 100)
		this.refined_metals =		new Commodity('refined_metals', 0, 12, 24, 8)
		this.heavy_machinery =		new Commodity('heavy_machinery', 0, 150, 250, 100)
		if (typeof supplies === 'string'&&typeof food === 'number') {
			if (valid_keys.includes(supplies)) {
				this[supplies].amount = food
			}
		}else{
			this.supplies.amount = supplies
			this.food.amount = food
			this.fertilizer.amount = fertilizer
			this.basic_commodities.amount = basic_commodities
			this.luxury_goods.amount = luxury_goods
			this.recreational_drugs.amount = recreational_drugs
			this.refined_metals.amount = refined_metals
			this.heavy_machinery.amount = heavy_machinery
		}
	}

	for_each_commodity(iterative_function){
		if (typeof iterative_function === 'function') {
			const keys = ['supplies','food','fertilizer','basic_commodities','luxury_goods','recreational_drugs','refined_metals','heavy_machinery']
			const returns = []
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				returns.push(iterative_function(this[key], key, i))
			}
			return returns
		}else{
			throw new Error("Invalid parameters");
		}
	}

	add(value){
		if (value instanceof Commodities) {
			this.for_each_commodity((commodity, key)=>this[key].amount += value[key].amount)
		}else if (typeof value === 'number'){
			this.for_each_commodity((commodity, key)=>this[key].amount += value)
		}else{
			throw new Error("Invalid parameter");
		}
		return this
	}

	subtract(value){
		if (value instanceof Commodities) {
			this.for_each_commodity((commodity, key)=>this[key].amount -= value[key].amount)
		}else if (typeof value === 'number'){
			this.for_each_commodity((commodity, key)=>this[key].amount -= value)
		}else{
			throw new Error("Invalid parameter");
		}
		return this
	}

	multiply(value){
		if (value instanceof Commodities) {
			this.for_each_commodity((commodity, key)=>this[key].amount *= value[key].amount)
		}else if (typeof value === 'number'){
			this.for_each_commodity((commodity, key)=>this[key].amount *= value)
		}else{
			throw new Error("Invalid parameter");
		}
		return this
	}

	divide(value){
		if (value instanceof Commodities) {
			this.for_each_commodity((commodity, key)=>this[key].amount /= value[key].amount)
		}else if (typeof value === 'number'){
			this.for_each_commodity((commodity, key)=>this[key].amount /= value)
		}else{
			throw new Error("Invalid parameter");
		}
		return this
	}
}




class Industry {
	constructor(name='new industry', produce, consumption) {
		if (produce instanceof Commodities && consumption instanceof Commodities) {			
			this.name = name
			this.produce = produce
			this.consumption = consumption
		}else{
			throw new Error("Invalid parameters");
		}
	}

	production(available_resources){
		if (available_resources instanceof Commodities) {
			
		}
	}
}




class Market {
	constructor(population, economy_gdp, stability, access) {
		this.population =	population
		this.economy_gdp =	economy_gdp
		this.stability =	stability
		this.access =		access
		this.commodities =	new Commodities(250, 1500, 900, 1200, 600, 50, 3200, 400)
		this.industries = [
			new Industry('farming', new Commodities(0,1,0,0,0,0,0,0), new Commodities(0,0,1,0,0,0,0,0))
		]
	}
}




class Vector3D {
	/*
	The systems have to exist somewhere in space. I use a Vector3D to set the position in space relative to the starting system which is always at (0, 0, 0)
	The unit of measurement is in lightyears. Distances between planets within systems will not be simulated using this method. 

	Almost all the methods should return a copy of the vector3d the exceptions being normalize() and toFixed()
	*/
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

	// All these methods might not be necessary
	
	clone() {
		return new Vector3D(this.x, this.y, this.z)
	}

    add(vector) {
        return new Vector3D(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    subtract(vector) {
        return new Vector3D(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

	multiply(vector){
		if(typeof vector === "number"){
			return new Vector3D(this.x * vector, this.y * vector, this.z * vector)
		}else if(vector instanceof Vector3D){
			return new Vector3D(this.x * vector.x, this.y * vector.y, this.z * vector.z)
		}
	}

    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    cross(vector) {
        return new Vector3D(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x
        );
    }

	normal() {
		const magnitude = Math.sqrt(this.x**2+ this.y**2 + this.z**2)
		if (magnitude === 0) {
			throw new Error("Cannot normalize a zero vector");
		}
		return new Vector3D(this.x/magnitude, this.y/magnitude, this.z/magnitude)
	}

	normalize() {
		const magnitude = Math.sqrt(this.x**2+ this.y**2 + this.z**2)
		if (magnitude === 0) {
			throw new Error("Cannot normalize a zero vector");
		}
		this.x /= magnitude
		this.y /= magnitude
		this.z /= magnitude
	}

	distance(vector) {
		if(vector === 0){
			return Math.sqrt((0 - this.x) ** 2 + (0 - this.y) ** 2 + (0 - this.z) ** 2)
		}else if(vector instanceof Vector3D){
			return Math.sqrt((vector.x - this.x) ** 2 + (vector.y - this.y) ** 2 + (vector.z - this.z) ** 2)
		}else{
			throw new Error(vector + " is not a valid object")
		}
	}

	toFixed(value) {
		this.x = Number(this.x.toFixed(value))
		this.y = Number(this.y.toFixed(value))
		this.z = Number(this.z.toFixed(value))
	}

	magnitude() {
		return Math.sqrt(this.x**2+ this.y**2 + this.z**2)
	}
}




function clamp(value, min = 0, max = 1) {
	if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
		throw new Error("Invalid parameters");
	}
	return Math.min(Math.max(value, min), max)
}




function random_array_element(array){
	return array[Math.floor(Math.random() * array.length)]
}




function simplify(n){
    if(n < 1000){return Math.round(n)}
    let denom = 0
    const symbols = [" ", "K", "M", "B", "T", "Qa", "Qu", "Sx", "Se", "Oc", "No"]
    while(n >= 1000){
        denom++
        n *= 0.001
    }

    let nr = n
    nr = Math.floor(nr)
    nr = nr.toString()
    let len = nr.length
    nr = 3 - len
    if(nr > 0){
        n = n.toFixed(nr)
    }
    else {
        n = Math.floor(n)
    }

    return n + symbols[denom]
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




function create_star_system_info_element(star_info_elements, planet_info_table, distance_to_start, number_of_objects, system_name, system_position){
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

	const name_paragraph = document.createElement("p")
	name_paragraph.textContent = "System name: " + system_name
	name_paragraph.className = "star-system-info-paragraph"
	info_container.appendChild(name_paragraph)

	const position_paragraph = document.createElement("p")
	position_paragraph.className = "star-system-info-paragraph"
	position_paragraph.textContent = "X " + system_position.x + ", Y " + system_position.y + ", Z " +system_position.z
	info_container.appendChild(position_paragraph)
	
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




function create_star_system_info_element2(system){
	const star_info_elements = create_star_info_list(system.stars)
	const planet_info_table = create_planets_table_element(system.planets)
	const distance_to_start = system.distance_to_start.toFixed(2)
	const number_of_objects = system.stars.length + system.planets.length
	const system_name = system.name
	const system_position = system.position.clone()
	system_position.toFixed(2)
	const star_system_info_element = create_star_system_info_element(star_info_elements, planet_info_table, distance_to_start, number_of_objects, system_name, system_position)
	return star_system_info_element
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




function create_star_info_list(stars){
	let star_info_elements = []
	for (let i = 0; i < stars.length; i++) {
		const element = stars[i];
		star_info_elements.push(create_star_info_element(element.type, element.mass_solar))
	}
	return star_info_elements
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
		const planet_table_row = create_planet_info_element(planet_object.type, planet_object.mass, planet_object.hazard_rating, planet_object.average_surface_temperature, planet_object.atmosphere_pressure, planet_object.organics, planet_object.has_colony)
		
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




function random_number_by_weight(numbers, numbers_weight){
	//There should be a one to one correlation between 'numbers' and 'numbers_weight'
	let numbers_copy = Array.from(numbers)
	let weights = Array.from(numbers_weight)
	while(weights.length < numbers_copy.length){
		weights.push(1)
	}
	while(numbers_copy.length < weights.length){
		numbers_copy.push(0)
	}
	let sum = 0
	for (let i = 0; i < weights.length; i++) {
		const element = weights[i]
		sum += Math.abs(element)
	}
	const random_number = Math.random() * sum
	let weight = 0
	for (let i = 0; i < numbers_copy.length; i++) {
		const number = numbers_copy[i]
		weight += Math.abs(weights[i])
		if(random_number < weight){
			return number
		}
	}
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




function generate_random_planet(energy_from_stars, solar_wind_intensity, type = random_array_element(["terra", "gas giant", "oceania", "super oceania"]), atmosphere_pressure, mass){	
	console.groupCollapsed('generate random planet')
	console.log('energy from stars', energy_from_stars)
	switch (type) {
		case "gas giant":
			if(mass === undefined){
				mass = Math.sqrt((Math.random() ** 4) * 200) + 4
			}
			if(atmosphere_pressure === undefined){
				atmosphere_pressure = 1
			}
			break;
		case "oceania":
			if(mass === undefined){
				mass = Math.sqrt((Math.random() ** 4) * 2) + 0.6
			}
			if(atmosphere_pressure === undefined){
				atmosphere_pressure = ((Math.random() ** 4) * 120) + 0.6
			}
			break;
		case "super oceania":
			if(mass === undefined){
				mass = Math.sqrt((Math.random() ** 4) * 2) + 0.6
			}
			if(atmosphere_pressure === undefined){
				atmosphere_pressure = (Math.random() * 120) + 10
			}
			break;
		default:
			if(mass === undefined){
				mass = Math.sqrt((Math.random() ** 4) * 4) + 0.05
			}
			if(atmosphere_pressure === undefined){
				atmosphere_pressure = (Math.random() ** 6) * 100 / (solar_wind_intensity + 1)
			}
			break;
	}


	const rare_metals = Math.random() * 5

	const average_surface_temperature = Math.sqrt(energy_from_stars * soft_sign2(atmosphere_pressure - 1, 0.5, 2) * 80000)

	const hazard_rating = 0 + 
		(((average_surface_temperature - 285) ** 2) / 100000) + Math.log10(1.04 ** (average_surface_temperature - 305) + 1) +
		Math.log10((atmosphere_pressure - 1) ** 2 + 1) + (1 / (10 * atmosphere_pressure ** 2 + 1)) +
		(mass / 3)
	
	let organics = 0
	switch(type){
		case "terra":
			organics = 1
			break
		case "oceania":
			organics = 0.5
			break
	}
	organics -= (1 / (1000 * atmosphere_pressure ** 2)) + (0.002 * (1.2 ** atmosphere_pressure))
	organics -= (average_surface_temperature - 293 + Math.abs(average_surface_temperature - 293)) ** 2 / 1000 + (293 - average_surface_temperature + Math.abs(293 - average_surface_temperature)) ** 3 / 1000000
	organics = Math.max(organics, 0)
	
	const planet = new Planet(type, mass, hazard_rating, atmosphere_pressure, rare_metals, organics, average_surface_temperature, false)
	console.log(planet)
	console.groupEnd()
	return planet
}




function generate_random_star(mass_s = Math.random() ** 2 * 7 + 0.01){
	let type
	if(mass_s > 5){
		type = "blue giant"
	}else if(mass_s > 1.4){
		type = "white main sequence"
	}else if(mass_s > 0.8){
		type = "yellow dwarf"
	}else if(mass_s > 0.5){
		type = "orange dwarf"
	}else if(mass_s > 0.08){
		type = "red dwarf"
	}else{
		type = "brown dwarf"
	}
	const star = new Star(mass_s, type)
	return star
}




function generate_random_system(position, stars_amount = random_number_by_weight([1,2,3,4,5,6,7],[100,300,25,5,1,0.1]), planets_amount = Math.ceil(Math.random() * 16), system_name = "hip" + Number.parseInt(Math.random() * 999)){

	let stars = []
	let star_greatest_mass
	for (let i = 0; i < stars_amount; i++) {
		let star = generate_random_star()
		stars.push(star)
		if(star_greatest_mass === undefined){
			star_greatest_mass = star
		}else if(star.mass_solar > star_greatest_mass.mass_solar){
			star_greatest_mass = star
		}
	}

	stars.sort((a, b) => b["mass_solar"] - a["mass_solar"])


	const brightness = star_greatest_mass.brightness

	console.groupCollapsed("new star system")
	console.log("star brightness", brightness)

	let planets = []
	for (let i = 0; i < planets_amount; i++) {
		let distance_to_brightest_star = (i + 1) * (star_greatest_mass.mass_solar / 100 + 0.25) + 1
		let local_brightness = brightness / (distance_to_brightest_star ** 2)

		console.log("brightness", local_brightness, "distance", distance_to_brightest_star)

		planets.push(generate_random_planet(local_brightness, 1))
	}
	console.groupEnd()



	const system = new Star_system(stars, planets, position.distance(0), system_name, position)

	return system
}




function open_planet_overview_panel(planet = new Planet()){
	console.groupCollapsed("open planet overview panel")
	console.log("planet", planet)

	planet_overview_base_element.style.display = "block"

	const farming_element = document.getElementById("farming")
	const mining_element = document.getElementById("mining")
	const industry_element = document.getElementById("industry")
	const space_elevator_element = document.getElementById("space-elevator")
	const mass_driver_element = document.getElementById("mass-driver")
	const rift_generator_element = document.getElementById("rift-generator")

	farming_element.style.display = "none"
	mining_element.style.display = "none"
	industry_element.style.display = "none"
	space_elevator_element.style.display = "none"
	mass_driver_element.style.display = "none"
	rift_generator_element.style.display = "none"

	if(planet.market.industries.some(element=>element.name === 'farming')){
		farming_element.style.display = "inline"
	}
	if(planet.market.mining){
		mining_element.style.display = "inline"
	}
	if(planet.market.industry){
		industry_element.style.display = "inline"
	}
	if(planet.market.space_elevator){
		space_elevator_element.style.display = "inline"
	}
	if(planet.market.mass_driver){
		mass_driver_element.style.display = "inline"
	}
	if(planet.market.rift_generator){
		rift_generator_element.style.display = "inline"
	}


	const population_element = document.getElementById("population")
	population_element.textContent = "Population: " + simplify(planet.population)
	
	const supplies_element = document.getElementById("supplies")
	supplies_element.textContent = "Supplies: " + simplify(planet.supplies)

	console.groupEnd()
}




function close_planet_overview_panel(){
	planet_overview_base_element.style.display = "none"
}




const star_1 = new Star(1 + (Math.random()*0.05 - 0.05/2), "yellow dwarf")
let brightness = star_1.brightness

let planets =[]

console.groupCollapsed("generated planet with solar energy")
console.log("star brightness", brightness)
for (let i = 0; i < 8; i++) {
	let local_brightness = brightness / ((i * 0.5 + 0.9) ** 2)
	
	if(i === 1){
		const starting_planet = generate_random_planet(local_brightness, 1, "terra", 1)
		starting_planet.access = 0
		starting_planet.has_colony = true
		planets.push(starting_planet)
	}else{
		planets.push(generate_random_planet(local_brightness, 1))
	}

	console.log("local brightness", local_brightness)
}
console.groupEnd()


const starting_system = new Star_system([star_1], planets, 0, "Sol", new Vector3D(0,0,0))



const star_info_elements = [create_star_info_element(star_1.type, star_1.mass_solar)]

const planets_table_element = create_planets_table_element(planets)

main_systems_list_element.appendChild(create_star_system_info_element(star_info_elements, planets_table_element, starting_system.distance_to_start, planets.length + 1, starting_system.name, starting_system.position))


for (let i = 0; i < 16; i++) {

	const distance = Math.cbrt((3*(i+1)*64)/(4*Math.PI))
	let position = new Vector3D(Math.random()-0.5,Math.random()-0.5,Math.random()-0.5)
	position.normalize()
	position = position.multiply(distance)
	main_systems_list_element.appendChild(create_star_system_info_element2(generate_random_system(position)))

}
