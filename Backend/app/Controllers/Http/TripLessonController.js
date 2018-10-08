'use strict'

/**
 * Resourceful controller for interacting with triplessons
 */
class TripLessonController {
  /**
   * Show a list of all triplessons.
   * GET triplessons
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new triplesson.
   * GET triplessons/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new triplesson.
   * POST triplessons
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single triplesson.
   * GET triplessons/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing triplesson.
   * GET triplessons/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update triplesson details.
   * PUT or PATCH triplessons/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a triplesson with id.
   * DELETE triplessons/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = TripLessonController
