'use strict'

/**
 * Resourceful controller for interacting with validationtokens
 */
class ValidationTokenController {
  /**
   * Show a list of all validationtokens.
   * GET validationtokens
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new validationtoken.
   * GET validationtokens/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new validationtoken.
   * POST validationtokens
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single validationtoken.
   * GET validationtokens/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing validationtoken.
   * GET validationtokens/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update validationtoken details.
   * PUT or PATCH validationtokens/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a validationtoken with id.
   * DELETE validationtokens/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ValidationTokenController
