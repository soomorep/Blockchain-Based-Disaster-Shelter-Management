;; Simple Facility Registration Contract

(define-data-var next-id uint u1)

(define-map shelters
  uint
  {
    location: (string-utf8 100),
    capacity: uint,
    type: (string-utf8 50),
    active: bool
  }
)

(define-public (register (location (string-utf8 100)) (capacity uint) (type (string-utf8 50)))
  (begin
    (let ((id (var-get next-id)))
      (map-set shelters id {
        location: location,
        capacity: capacity,
        type: type,
        active: true
      })
      (var-set next-id (+ id u1))
      (ok id))
  )
)

(define-public (set-active (id uint) (active bool))
  (begin
    (map-set shelters id (merge (default-to
      {location: "", capacity: u0, type: "", active: false}
      (map-get? shelters id))
      {active: active}))
    (ok true)
  )
)

(define-read-only (get-shelter (id uint))
  (map-get? shelters id)
)
