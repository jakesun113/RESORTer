'use strict'

/**
 * Resourceful controller for interacting with liftpasses
 */
class LiftpassController {
  /**
   * Show a list of all liftpasses.
   * GET liftpasses
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new liftpass.
   * GET liftpasses/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new liftpass.
   * POST liftpasses
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single liftpass.
   * GET liftpasses/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing liftpass.
   * GET liftpasses/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update liftpass details.
   * PUT or PATCH liftpasses/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a liftpass with id.
   * DELETE liftpasses/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = LiftpassController
