# Blockchain-Based Disaster Shelter Management

A decentralized system for managing emergency shelters during disasters using Clarity smart contracts on the Stacks blockchain.

## Overview

This system provides a transparent, secure, and efficient way to manage disaster shelters, track capacity, inventory resources, and verify staff certifications. By leveraging blockchain technology, it ensures data integrity and accessibility during critical emergency situations.

## Features

- **Facility Registration**: Register and manage emergency shelters
- **Capacity Tracking**: Monitor available space in real-time
- **Resource Inventory**: Track supplies and equipment at each location
- **Staff Certification**: Verify training and qualifications of shelter personnel

## Installation

### Prerequisites

- [Clarinet](https://github.com/hirosystems/clarinet) - Clarity development environment
- [Node.js](https://nodejs.org/) (v14+) - For running tests

### Setup

1. Clone the repository:
   Thought for 3 secondsI'll create a comprehensive README for the blockchain-based disaster shelter management system:

```markdown project="Blockchain Disaster Shelter Management" file="README.md"
...
```

git clone [https://github.com/yourusername/disaster-shelter-management.git](https://github.com/yourusername/disaster-shelter-management.git)
cd disaster-shelter-management

```plaintext

2. Install dependencies:
```

npm install

```plaintext

3. Deploy contracts (using Clarinet):
```

clarinet console

```plaintext

## Contract Overview

### Facility Registration (`facility-registration.clar`)

Manages the registration and details of emergency shelters.

**Key Functions:**
- `register-facility`: Add a new shelter with details
- `update-facility-status`: Change active status of a facility
- `get-facility`: Retrieve shelter information

### Capacity Tracking (`capacity-tracking.clar`)

Monitors current occupancy and available space at shelters.

**Key Functions:**
- `update-occupancy`: Update current occupant count
- `get-occupancy`: Get current occupancy data
- `get-available-capacity`: Calculate remaining capacity

### Resource Inventory (`resource-inventory.clar`)

Tracks supplies and equipment at each shelter location.

**Key Functions:**
- `update-resource`: Set resource quantity
- `add-resources`: Add to existing resource inventory
- `get-resource`: Retrieve resource information

### Staff Certification (`staff-certification.clar`)

Manages shelter personnel and their certifications.

**Key Functions:**
- `register-staff`: Add new staff member with certifications
- `assign-staff-to-facility`: Assign staff to a shelter
- `unassign-staff-from-facility`: Remove staff assignment
- `is-staff-assigned`: Check if staff is assigned to a facility

## Usage Examples

### Registering a New Shelter

```clarity
(contract-call? .facility-registration register-facility 
"Community Center Shelter" 
"123 Main St, Anytown, USA" 
u200 
"contact@shelter.org")
```

### Updating Shelter Occupancy

```plaintext
;; Update that 75 people are currently at facility #1
(contract-call? .capacity-tracking update-occupancy u1 u75)

;; Check available capacity
(contract-call? .capacity-tracking get-available-capacity u1)
```

### Managing Resources

```plaintext
;; Add 500 water bottles to facility #1
(contract-call? .resource-inventory update-resource u1 "water-bottles" u500)

;; Add 50 more blankets to existing inventory
(contract-call? .resource-inventory add-resources u1 "blankets" u50)
```

### Staff Management

```plaintext
;; Register a new staff member
(contract-call? .staff-certification register-staff 
  "John Doe" 
  "Shelter Manager" 
  (list "First Aid" "Crisis Management"))

;; Assign staff #1 to facility #2
(contract-call? .staff-certification assign-staff-to-facility u2 u1)
```

## Testing

Run the test suite with:

```plaintext
npm test
```

The tests use Vitest and a custom mock chain implementation to simulate blockchain behavior.

## Architecture

The system uses a modular design with four interconnected contracts:

```plaintext
┌─────────────────────┐      ┌─────────────────────┐
│                     │      │                     │
│ Facility            │◄────►│ Capacity            │
│ Registration        │      │ Tracking            │
│                     │      │                     │
└─────────────────────┘      └─────────────────────┘
          ▲                             ▲
          │                             │
          │                             │
          ▼                             ▼
┌─────────────────────┐      ┌─────────────────────┐
│                     │      │                     │
│ Resource            │      │ Staff               │
│ Inventory           │      │ Certification       │
│                     │      │                     │
└─────────────────────┘      └─────────────────────┘
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## License

This project is licensed under the MIT License - see the LICENSE file for details.

```plaintext

This README provides a comprehensive overview of your blockchain-based disaster shelter management system, including installation instructions, contract details, usage examples, and architecture information. It should help users understand the purpose of the project and how to use it effectively.
```
