---
layout: page_coursera
title: Getting Started with Google Kubernetes Engine
---


[Architecting with Google Kubernetes Engine Specialization](https://www.coursera.org/programs/open-access-guyana-ngeor/specializations/architecting-google-kubernetes-engine)


# 1. Introduction

[Getting Started with Google Kubernetes Engine](https://www.coursera.org/learn/google-kubernetes-engine/home/module/1)


Kubernetes is an orchestration framework for software containers. Containers are a way to package and run code that's more efficient than virtual machines. Kubernetes provides the tools you need to run containerized applications in production and at scale.

**Google Computing Services:**
1. Computer Engine :
  * IaaS (Infrastructure as a service) offering - compute, stroage, network.
  * Predefined and customized VMs - complete control over infrastructure.
  * Presistent disks and local SSDs.
  * Managed instance groups.
  * Pre-second billing.
2. Google Kubernetes Engine:
  * Runs containerized applications.
  * Code packaged with all its dependencies.
3. App Engine: (<u>focus on building application</u>, instead of deploying and managing env)
  * Fully managed PaaS (Platform as a service) offering.
  * Focused on application logic.
  * Bind code to libraries. Deploys required infrastructure (java, nodejs, py, php, c#, .net, ruby, go)
  * Integrated with Cloud tools. Support version control + traffic splitting.
  * Use cases : Website, Mobili Gaming backends, Apis interfaces.
4. Cloud Functions:
  * lightweight, <u>event-based, asynchronous compute solution</u>, without needs of a server or a runtime env.
  * Execute codes in response to events. Function as a service offering. Deploys the computing capacity to run code.
  * Can connect and extend cloud services.
  * Bills to nearest 100 millisecond.
  * Use cases : part of a microservices application architecture; simple serveless mobili or IoT backendsl; part of intelligent applications.
5. Cloud Run.
  * A managed compute platform, runs stateless containers.
  * Serverless (without infrastructure). Built on Knative.
  * Fast, charges only for resources used.

[Google Cloud locations](https://cloud.google.com/about/locations)

**Resource management**, policy managements.

<div align="center"><pre class="mermaid">
flowchart TD
ON["Organization Node"] --> Folder
Folder --> Project1
Folder --> Project2
Project1 --> Resources1
Project2 --> Resources2
</pre></div>

**Interaction** methods:
1. [Google Cloud Console](https://console.cloud.google.com/).
2. Cloud SDK (gcluod tool, gsutil, bq) and Cloud Shell (command-line access).
3. APIS : control by code.
4. Google Cloud App. (start, stop, ssh, etc)
