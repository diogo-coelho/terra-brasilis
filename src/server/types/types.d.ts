import express from 'express'

export type ExpressApplication = express.Application

export interface IMainApplication {
  _express: ExpressApplication
}
