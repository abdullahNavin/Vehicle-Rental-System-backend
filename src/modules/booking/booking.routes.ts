import { Router } from "express";
import { bookingController } from "./booking.controller";
import bookingAuth from "../../middleware/bookingAuth";

const router = Router()

router.post('/', bookingAuth("admin", "customer"), bookingController.createBooking)
router.get('/', bookingAuth("admin", "customer"), bookingController.getBookings)
router.put('/:bookingId', bookingAuth("admin", "customer"), bookingController.updateBooking)

export const bookingRoutes = router