import express from 'express'

export type ExpressApplication = express.Application

export interface IMainApplication {
  public _express: ExpressApplication
}