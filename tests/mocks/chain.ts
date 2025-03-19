// Mock implementation of a Clarity blockchain for testing
// This is a simplified mock that doesn't actually execute Clarity code
// but simulates the expected behavior for testing

class MockChain {
	private state: {
		facilities: Map<number, any>
		occupancy: Map<number, any>
		resources: Map<string, any>
		staff: Map<number, any>
		assignments: Map<string, boolean>
		nextFacilityId: number
		nextStaffId: number
		blockHeight: number
	}
	
	constructor() {
		this.reset()
	}
	
	reset() {
		this.state = {
			facilities: new Map(),
			occupancy: new Map(),
			resources: new Map(),
			staff: new Map(),
			assignments: new Map(),
			nextFacilityId: 1,
			nextStaffId: 1,
			blockHeight: 1,
		}
	}
	
	callPublic(contract: string, method: string, args: any[]) {
		try {
			switch (contract) {
				case "facility-registration":
					return this.handleFacilityRegistration(method, args)
				case "capacity-tracking":
					return this.handleCapacityTracking(method, args)
				case "resource-inventory":
					return this.handleResourceInventory(method, args)
				case "staff-certification":
					return this.handleStaffCertification(method, args)
				default:
					return { success: false, error: "Unknown contract" }
			}
		} catch (error) {
			return { success: false, error: error.message }
		}
	}
	
	callReadOnly(contract: string, method: string, args: any[]) {
		return this.callPublic(contract, method, args)
	}
	
	private handleFacilityRegistration(method: string, args: any[]) {
		switch (method) {
			case "register-facility": {
				const [name, location, maxCapacity, contactInfo] = args
				const facilityId = this.state.nextFacilityId
				
				this.state.facilities.set(facilityId, {
					name,
					location,
					"max-capacity": maxCapacity,
					"contact-info": contactInfo,
					"is-active": true,
				})
				
				this.state.nextFacilityId++
				return { success: true, value: facilityId }
			}
			
			case "update-facility-status": {
				const [facilityId, isActive] = args
				if (!this.state.facilities.has(facilityId)) {
					return { success: false, error: 1 }
				}
				
				const facility = this.state.facilities.get(facilityId)
				facility["is-active"] = isActive
				this.state.facilities.set(facilityId, facility)
				
				return { success: true, value: true }
			}
			
			case "get-facility": {
				const [facilityId] = args
				if (!this.state.facilities.has(facilityId)) {
					return { success: true, value: null }
				}
				
				return { success: true, value: this.state.facilities.get(facilityId) }
			}
			
			case "get-facility-count": {
				return { success: true, value: this.state.nextFacilityId - 1 }
			}
			
			default:
				return { success: false, error: "Unknown method" }
		}
	}
	
	private handleCapacityTracking(method: string, args: any[]) {
		switch (method) {
			case "update-occupancy": {
				const [facilityId, currentOccupants] = args
				
				this.state.occupancy.set(facilityId, {
					"current-occupants": currentOccupants,
					"last-updated": this.state.blockHeight,
				})
				
				return { success: true, value: true }
			}
			
			case "get-occupancy": {
				const [facilityId] = args
				if (!this.state.occupancy.has(facilityId)) {
					return { success: true, value: null }
				}
				
				return { success: true, value: this.state.occupancy.get(facilityId) }
			}
			
			case "get-available-capacity": {
				const [facilityId] = args
				if (!this.state.facilities.has(facilityId) || !this.state.occupancy.has(facilityId)) {
					return { success: false, error: 1 }
				}
				
				const facility = this.state.facilities.get(facilityId)
				const occupancy = this.state.occupancy.get(facilityId)
				
				const maxCapacity = facility["max-capacity"]
				const currentOccupants = occupancy["current-occupants"]
				
				return { success: true, value: maxCapacity - currentOccupants }
			}
			
			default:
				return { success: false, error: "Unknown method" }
		}
	}
	
	private handleResourceInventory(method: string, args: any[]) {
		switch (method) {
			case "update-resource": {
				const [facilityId, resourceType, quantity] = args
				const key = `${facilityId}-${resourceType}`
				
				this.state.resources.set(key, {
					quantity,
					"last-updated": this.state.blockHeight,
				})
				
				return { success: true, value: true }
			}
			
			case "add-resources": {
				const [facilityId, resourceType, quantityToAdd] = args
				const key = `${facilityId}-${resourceType}`
				
				if (this.state.resources.has(key)) {
					const resource = this.state.resources.get(key)
					const newQuantity = resource.quantity + quantityToAdd
					
					this.state.resources.set(key, {
						quantity: newQuantity,
						"last-updated": this.state.blockHeight,
					})
				} else {
					this.state.resources.set(key, {
						quantity: quantityToAdd,
						"last-updated": this.state.blockHeight,
					})
				}
				
				return { success: true, value: true }
			}
			
			case "get-resource": {
				const [facilityId, resourceType] = args
				const key = `${facilityId}-${resourceType}`
				
				if (!this.state.resources.has(key)) {
					return { success: true, value: null }
				}
				
				return { success: true, value: this.state.resources.get(key) }
			}
			
			default:
				return { success: false, error: "Unknown method" }
		}
	}
	
	private handleStaffCertification(method: string, args: any[]) {
		switch (method) {
			case "register-staff": {
				const [name, role, certifications] = args
				const staffId = this.state.nextStaffId
				
				this.state.staff.set(staffId, {
					name,
					role,
					certifications,
					"is-active": true,
				})
				
				this.state.nextStaffId++
				return { success: true, value: staffId }
			}
			
			case "assign-staff-to-facility": {
				const [facilityId, staffId] = args
				const key = `${facilityId}-${staffId}`
				
				this.state.assignments.set(key, true)
				return { success: true, value: true }
			}
			
			case "unassign-staff-from-facility": {
				const [facilityId, staffId] = args
				const key = `${facilityId}-${staffId}`
				
				this.state.assignments.set(key, false)
				return { success: true, value: true }
			}
			
			case "get-staff-member": {
				const [staffId] = args
				if (!this.state.staff.has(staffId)) {
					return { success: true, value: null }
				}
				
				return { success: true, value: this.state.staff.get(staffId) }
			}
			
			case "is-staff-assigned": {
				const [facilityId, staffId] = args
				const key = `${facilityId}-${staffId}`
				
				if (!this.state.assignments.has(key)) {
					return { success: true, value: false }
				}
				
				return { success: true, value: this.state.assignments.get(key) }
			}
			
			default:
				return { success: false, error: "Unknown method" }
		}
	}
}

export const mockChain = new MockChain()

