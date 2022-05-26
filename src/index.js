let readings
let api_info
let timestamp
let update_timestamp
let region_metadata


const getPsi = async () => {
    let results
    await fetch("https://api.data.gov.sg/v1/environment/psi").then(res => res.json()).then(
        data => {
            readings = data.items[0].readings
            api_info = data.api_info
            timestamp = data.items[0].timestamp
            update_timestamp = data.items[0].update_timestamp
            region_metadata = data.region_metadata
        }
    )
    // return results
}

const setTime = async () => {
    

    document.getElementById("time").innerHTML = await getPsi().then(() => { 
        const d = new Date(update_timestamp);
        return `TIME UPDATED: ${d}` });
}

const setTable = async () => {
    let tableBody = document.getElementById("table-body")
    let rowTitles = (Object.keys(readings))
    rowTitles.forEach((each, index) => {
        let row = {
            index: index,
            metric: each,
            national: readings[each].national,
            central: readings[each].central,
            west: readings[each].west,
            east: readings[each].east,
            north: readings[each].north,
            south: readings[each].south
        }
        console.log(row)
        let r = document.createElement("tr")
        if (index % 2 == 0) {

            r.innerHTML = `
        <tr class="bg-gray-100 border-b">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${row.index + 1}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${row.metric}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  ${row.national}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  ${row.central}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  ${row.west}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  ${row.east}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  ${row.north}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  ${row.south}
                </td>
              </tr>
              `
            r.id="even"
            tableBody.appendChild(r)
        } else {
            r.innerHTML = `
        <tr class="bg-white border-b">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${row.index + 1}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  ${row.metric}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  ${row.national}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  ${row.central}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  ${row.west}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  ${row.east}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  ${row.north}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  ${row.south}
                </td>
              </tr>
              `
            tableBody.appendChild(r)
        }

    })


}

setTime().then(() => { setTable() })





